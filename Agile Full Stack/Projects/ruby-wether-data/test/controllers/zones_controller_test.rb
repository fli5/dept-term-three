require "test_helper"

class ZonesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get zones_index_url
    assert_response :success
  end

  test "should get show" do
    get zones_show_url
    assert_response :success
  end
end
