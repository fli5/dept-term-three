#!/usr/bin/env python
# -*- coding: utf-8 -*-
import ssl

# ---------------------------------------------------------------------
# Program: Full Stack Web Development
# Author: Feng Li
# Course: WEBD-3010 (273793) Web Development 3
# Created: 2025-10-12
# ---------------------------------------------------------------------
import pandas as pd
from dash import Dash, dcc, html, dash_table, Input, Output
import plotly.express as px
import dash_bootstrap_components as dbc

ssl._create_default_https_context = ssl._create_unverified_context
# ------------------------------------------
# Load the dataset (Winnipeg Open Data API)
# ------------------------------------------
# https://data.winnipeg.ca/resource/f58p-2ju3.json?$limit=100
url = "https://data.winnipeg.ca/resource/d3jk-hb6j.csv"
df = pd.read_csv(url)

# # Clean the data a bit
df = df.dropna(subset=['neighbourhood'])
# df["year"] = df["year"].astype(int)
# df = df[df["aadt"] > 0]

# ------------------------------------------
# Create the Dash app
# ------------------------------------------
external_stylesheets = [dbc.themes.CERULEAN]
app = Dash(__name__, external_stylesheets=external_stylesheets)

app.layout = html.Div([
    html.H1("Winnipeg Traffic Volume Data", style={'textAlign': 'center'}),

    html.P("Data Source: City of Winnipeg Open Data Portal"),


    # Dropdown for selecting a location
    html.Label("Select a Location:"),

    dcc.Dropdown(
        id="location-dropdown",
        options=[{'label': loc, 'value': loc} for loc in df["neighbourhood"].unique().tolist()],
        value=df["neighbourhood"].unique()[0],
        clearable=False
    ),

    html.Br(),

    # Data Table
    html.H2("Traffic Volume Table"),
    dash_table.DataTable(
        id='traffic-table',
        columns=[{"name": i, "id": i} for i in df.columns],
        data=df.to_dict('records'),
        page_size=10,
        style_table={'overflowX': 'auto'},
        style_header={'backgroundColor': '#0074D9', 'color': 'white', 'fontWeight': 'bold'},
        style_cell={'textAlign': 'left', 'padding': '8px'}
    ),

    html.Br(),

    # Graph
    html.H2("Traffic Volume Trend Over Time"),
    dcc.Graph(id="traffic-graph")
])


# ------------------------------------------
# Callback to update graph based on selection
# ------------------------------------------
@app.callback(
    Output("traffic-graph", "figure"),
    Input("location-dropdown", "value")
)
def update_graph(selected_location):
    filtered = df[df["neighbourhood"] == selected_location]
    fig = px.line(
        filtered,
        x="year",
        y="aadt",
        title=f"Traffic Volume Over Time: {selected_location}",
        markers=True
    )
    fig.update_layout(
        xaxis_title="Year",
        yaxis_title="Average Daily Traffic (AADT)",
        template="plotly_white"
    )
    return fig


# ------------------------------------------
# Run the app
# ------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
