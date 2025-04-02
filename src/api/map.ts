import axios from "axios";

// 获取地图数据
export async function getMapData() {
  try {
    const response = await axios.get('/map');
    return response.data;
  } catch (error) {
    console.error("Error fetching map data:", error);
    throw error;
  }
}

// 获取某个位置的详细信息
export async function getLocationDetails(locationId: string) {
  try {
    const response = await axios.get(`/map/location/${locationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw error;
  }
}

// 获取某个位置的周边信息
export async function getNearbyLocations(locationId: string) {
  try {
    const response = await axios.get(`/map/location/${locationId}/nearby`);
    return response.data;
  } catch (error) {
    console.error("Error fetching nearby locations:", error);
    throw error;
  }
}

// 获取某个位置的路线信息
export async function getRouteInfo(startLocationId: string, endLocationId: string) {
  try {
    const response = await axios.get('/map/route', {
      params: {
        start: startLocationId,
        end: endLocationId
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching route info:", error);
    throw error;
  }
}
