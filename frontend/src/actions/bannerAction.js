import axios from 'axios';
import {
    ALL_BANNER_FAIL,
    ALL_BANNER_REQUEST,
    ALL_BANNER_SUCCESS,
    NEW_BANNER_REQUEST,
    NEW_BANNER_SUCCESS,
    NEW_BANNER_FAIL,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,
    CLEAR_ERRORS
} from '../constant/bannerConstant'

export const getBanner=()=>async(dispatch)=>{
    try {
        dispatch({
            type:ALL_BANNER_REQUEST
        })
        const {data}=await axios.get('/api/v1/banners');
        dispatch({
            type:ALL_BANNER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_BANNER_FAIL,
            payload:error.response.data.message,
        })
    }
}
export const deleteBanner = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANNER_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);
    dispatch({
      type: DELETE_BANNER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
export const createBanner = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BANNER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/banner/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};
