import dash
from dash import dcc, html, dash_table, Input, Output
import requests
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots


# --------------------------------------------------------
# Load Environmental Monitoring Data
# --------------------------------------------------------
def load_data():
    """
        Load environmental data with error handling

        {
        "observationid": "5327825",
        "observationtime": "2022-12-03T03:00:42.000",
        "thingid": "120",
        "locationname": "St. James East",
        "measurementtype": "Temperature",
        "measurementvalue": "-99.99",
        "measurementunit": "C",
        "location": {
            "latitude": "49.879133",
            "longitude": "-97.205769",
            "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        "point": {
            "type": "Point",
            "coordinates": [
                -97.205769,
                49.879133
            ]
        },
        ":@computed_region_66r8_mmhg": "4",
        ":@computed_region_6rfj_69jf": "13",
        ":@computed_region_38v8_cedi": "32"
    }
    """
    URL = "https://data.winnipeg.ca/resource/f58p-2ju3.json?$limit=1000"
    try:
        response = requests.get(URL, timeout=10)
        response.raise_for_status()
        data = response.json()

        if not data:
            print("Warning: API returned empty dataset")
            return pd.DataFrame()

        df = pd.DataFrame(data)
        print(f"Loaded {len(df)} records")
        return df

    except requests.exceptions.RequestException as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()


df = load_data()

# --------------------------------------------------------
# Clean and Transform Data
# --------------------------------------------------------
if not df.empty:
    # Convert observation time to datetime
    # Set to NaT (Not a Time) when encounters errors
    df["observationtime"] = pd.to_datetime(df["observationtime"], errors="coerce")

    # Convert measurement value to numeric
    # Set to NaN when encounters errors
    df["measurementvalue"] = pd.to_numeric(df["measurementvalue"], errors="coerce")

    # Set measurementvalue to NaN when measurementvalue is -99.99 on any row
    df.loc[df["measurementvalue"] == -99.99, "measurementvalue"] = None

    # Extract latitude and longitude if available
    if "location" in df.columns:
        try:
            df["latitude"] = df["location"].apply(
                lambda x: (
                    float(x.get("latitude", None)) if isinstance(x, dict) else None
                )
            )
            df["longitude"] = df["location"].apply(
                lambda x: (
                    float(x.get("longitude", None)) if isinstance(x, dict) else None
                )
            )
        except:
            pass

    # Fill missing location names
    if "locationname" in df.columns:
        df["locationname"] = df["locationname"].fillna("Unknown")


# --------------------------------------------------------
# Create Visualizations
# --------------------------------------------------------
def create_measurement_by_location(dataframe):
    """Bar chart of observations by location and measurement type"""
    if dataframe.empty:
        return go.Figure().add_annotation(
            text="No data available",
            xref="paper",
            yref="paper",
            x=0.5,
            y=0.5,
            showarrow=False,
        )

    # Count by location and measurement type and convert to DataFrame
    location_counts = (
        dataframe.groupby(["locationname", "measurementtype"])
        .size()
        .reset_index(name="count")
    )

    fig = px.bar(
        location_counts,
        x="locationname",
        y="count",
        color="measurementtype",
        title="Observations by Location and Type",
        labels={"locationname": "Location", "count": "Number of Observations"},
        barmode="group",
    )
    fig.update_layout(xaxis_tickangle=-45, height=400)
    return fig


def create_temperature_time_series(dataframe):
    """Time series of temperature readings"""
    # Show blank figure if no data or no observationtime column
    if dataframe.empty or "observationtime" not in dataframe.columns:
        return go.Figure().add_annotation(
            text="No time series data",
            xref="paper",
            yref="paper",
            x=0.5,
            y=0.5,
            showarrow=False,
        )

    # Filter for temperature measurements
    temp_df = dataframe[
        (dataframe["measurementtype"] == "Temperature")
        & (dataframe["measurementvalue"].notna())
        & (dataframe["observationtime"].notna())
    ].copy()

    # Show blank figure if no temperature data
    if temp_df.empty:
        return go.Figure().add_annotation(
            text="No temperature data",
            xref="paper",
            yref="paper",
            x=0.5,
            y=0.5,
            showarrow=False,
        )

    # Create line chart of temperature over time by location
    fig = px.line(
        temp_df,
        x="observationtime",
        y="measurementvalue",
        color="locationname",
        title="Temperature Readings Over Time",
        labels={
            "observationtime": "Date/Time",
            "measurementvalue": "Temperature (°C)",
            "locationname": "Location",
        },
    )
    fig.update_layout(height=400)
    return fig


# --------------------------------------------------------
# Build Dash App
# --------------------------------------------------------
app = dash.Dash(__name__)

app.layout = html.Div(
    [
        # Header
        html.Div(
            [
                html.H1(
                    "Winnipeg Environmental Monitoring Dashboard",
                    style={
                        "textAlign": "center",
                        "color": "#2c3e50",
                        "marginBottom": "10px",
                    },
                ),
            ],
            style={
                "padding": "30px 20px",
                "backgroundColor": "#ecf0f1",
                "borderBottom": "3px solid #3498db",
            },
        ),
        # Visualizations Grid
        html.Div(
            [
                html.H2(
                    "Environmental Trends",
                    style={"color": "#2c3e50", "marginBottom": "20px"},
                ),
                # First row
                html.Div(
                    [
                        html.Div(
                            [
                                dcc.Graph(
                                    id="location_chart",
                                    figure=create_measurement_by_location(df),
                                )
                            ],
                            style={"flex": "1", "minWidth": "400px"},
                        ),
                    ],
                    style={
                        "display": "flex",
                        "gap": "20px",
                        "flexWrap": "wrap",
                        "marginBottom": "20px",
                    },
                ),
                # Second row
                html.Div(
                    [
                        html.Div(
                            [
                                dcc.Graph(
                                    id="temp_time_series",
                                    figure=create_temperature_time_series(df),
                                )
                            ],
                            style={"flex": "1", "minWidth": "400px"},
                        ),
                    ],
                    style={"display": "flex", "gap": "20px", "flexWrap": "wrap"},
                ),
            ],
            style={"padding": "30px 40px", "backgroundColor": "#f8f9fa"},
        ),
        # Data Table Section
        html.Div(
            [
                html.H2("Raw Data", style={"color": "#2c3e50", "marginBottom": "10px"}),
                html.P(
                    f"Showing latest 500 observations out of {len(df):,} total records",
                    style={"color": "#7f8c8d", "marginBottom": "20px"},
                ),
                (
                    dash_table.DataTable(
                        id="data_table",
                        columns=(
                            [
                                {"name": "Observation Time", "id": "observationtime"},
                                {"name": "Location", "id": "locationname"},
                                {"name": "Measurement Type", "id": "measurementtype"},
                                {"name": "Value", "id": "measurementvalue"},
                                {"name": "Unit", "id": "measurementunit"},
                                {"name": "Observation ID", "id": "observationid"},
                            ]
                            if not df.empty
                            else []
                        ),
                        data=(
                            df[
                                [
                                    "observationtime",
                                    "locationname",
                                    "measurementtype",
                                    "measurementvalue",
                                    "measurementunit",
                                    "observationid",
                                ]
                            ]
                            .sort_values("observationtime", ascending=False)
                            .head(500)
                            .to_dict("records")
                            if not df.empty
                            else []
                        ),
                        page_size=15,
                        style_table={"overflowX": "auto"},
                        style_cell={
                            "textAlign": "left",
                            "padding": "12px",
                            "fontFamily": "Arial, sans-serif",
                            "fontSize": "14px",
                        },
                        style_header={
                            "backgroundColor": "#3498db",
                            "color": "white",
                            "fontWeight": "bold",
                            "textAlign": "left",
                        },
                        style_data_conditional=[
                            {"if": {"row_index": "odd"}, "backgroundColor": "#f8f9fa"},
                            {
                                "if": {"column_id": "measurementvalue"},
                                "fontWeight": "bold",
                                "color": "#2c7bb6",
                            },
                        ],
                        filter_action="native",
                        sort_action="native",
                    )
                    if not df.empty
                    else html.Div(
                        "No data available",
                        style={
                            "color": "#e74c3c",
                            "padding": "40px",
                            "textAlign": "center",
                            "fontSize": "18px",
                        },
                    )
                ),
            ],
            style={"padding": "30px 40px", "backgroundColor": "white"},
        ),
    ],
    style={"fontFamily": "Arial, sans-serif", "backgroundColor": "#ecf0f1"},
)

if __name__ == "__main__":
    app.run(debug=True)
