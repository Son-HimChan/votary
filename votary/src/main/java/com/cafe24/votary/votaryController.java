package com.cafe24.votary;

import java.util.List;
import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.cafe24.votary.bittrex.Api_Client;
import com.cafe24.votary.bithum.bithumClient;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
/**
 * Handles requests for the application home page.
 */
@Controller
public class votaryController {

	private static final Logger logger = LoggerFactory.getLogger(votaryController.class);
	
    @RequestMapping("/votary.do")
    public ModelAndView main(Model model , HttpServletRequest request , @RequestParam HashMap<String , Object> param) throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("votary/votary");
        return mav;
    }
    
	@RequestMapping(value = "/getVotaryData.do")
	public ModelAndView getVotaryData(ModelMap model , HttpServletRequest request , @RequestParam HashMap<String , Object> param) throws Exception {
		
		Api_Client api = new Api_Client();
		HashMap<String, String> rgParams = new HashMap<String, String>();
		//rgParams.put("currency", "BTC");
		HashMap<String , Object> returnMap = new HashMap<String , Object>();
		try {
			Gson gson = new Gson();
		    bithumClient bithumApi = new bithumClient("2a568fe1d0b84c094dd5a3ba67632dcd", "16f2d439aeb38998f3a55ca55b2663a0");
			rgParams.put("currency", "ALL");
			String result = bithumApi.callApi("/public/orderbook", rgParams);
			Map<String, Object> bthJosnObj = gson.fromJson(result, new TypeToken<Map<String, Object>>(){}.getType());
			String bthData = gson.toJson(bthJosnObj.get("data"));
			Map<String, Object> bthJosnDtlObj = gson.fromJson(bthData, new TypeToken<Map<String, Object>>(){}.getType());
			/*
			// 비트
			String bthBtcData = gson.toJson(bthJosnObj.get("BTC"));
			Map<String, Object> bthJosnBtcObj = gson.fromJson(bthBtcData, new TypeToken<Map<String, Object>>(){}.getType());
		    List<Map<String, Object>> bthBtcBids = (List<Map<String, Object>>) bthJosnBtcObj.get("bids");
		    List<Map<String, Object>> bthBtcAsks = (List<Map<String, Object>>) bthJosnBtcObj.get("asks");
		    // 이더
		    String bthEthData = gson.toJson(bthJosnObj.get("ETH"));
			Map<String, Object> bthJosnEthObj = gson.fromJson(bthBtcData, new TypeToken<Map<String, Object>>(){}.getType());
		    List<Map<String, Object>> bthEthBids = (List<Map<String, Object>>) bthJosnEthObj.get("bids");
		    List<Map<String, Object>> bthEthAsks = (List<Map<String, Object>>) bthJosnEthObj.get("asks");
		    // 대시
		    String bthDashData = gson.toJson(bthJosnObj.get("DASH"));
			Map<String, Object> bthJosnDashObj = gson.fromJson(bthDashData, new TypeToken<Map<String, Object>>(){}.getType());
		    List<Map<String, Object>> bthDashBids = (List<Map<String, Object>>) bthJosnDashObj.get("bids");
		    List<Map<String, Object>> bthDashAsks = (List<Map<String, Object>>) bthJosnDashObj.get("asks");
		    // 라코
		    String bthLtcData = gson.toJson(bthJosnObj.get("LTC"));
			Map<String, Object> bthJosnLtcObj = gson.fromJson(bthLtcData, new TypeToken<Map<String, Object>>(){}.getType());
		    List<Map<String, Object>> bthLtcBids = (List<Map<String, Object>>) bthJosnLtcObj.get("bids");
		    List<Map<String, Object>> bthLtcAsks = (List<Map<String, Object>>) bthJosnLtcObj.get("asks");
		    // 이클
		    String bthEtcData = gson.toJson(bthJosnObj.get("ETC"));
			Map<String, Object> bthJosnEtcObj = gson.fromJson(bthEtcData, new TypeToken<Map<String, Object>>(){}.getType());
		    List<Map<String, Object>> bthEtcBids = (List<Map<String, Object>>) bthJosnEtcObj.get("bids");
		    List<Map<String, Object>> bthEtcAsks = (List<Map<String, Object>>) bthJosnEtcObj.get("asks");
		    
		    String bthXrpData = gson.toJson(bthJosnObj.get("XRP"));
			Map<String, Object> bthJosnXrpObj = gson.fromJson(bthXrpData, new TypeToken<Map<String, Object>>(){}.getType());
		    List<Map<String, Object>> bthXrpBids = (List<Map<String, Object>>) bthJosnXrpObj.get("bids");
		    List<Map<String, Object>> bthXrpAsks = (List<Map<String, Object>>) bthJosnXrpObj.get("asks");
		    */
		    //bthBtcBids.get(bthBtcBids.size()-1).get("price")
		    //bthBtcAsks.get(0).get("price") 
		    result = api.callApi("/public/getmarketsummaries", rgParams);
		    
		    Map<String, Object> jsonObject = gson.fromJson(result, new TypeToken<Map<String, Object>>(){}.getType());
		    List<Map<String, Object>> results = (List<Map<String, Object>>) jsonObject.get("result");
		    for (int i = 0; i < results.size(); i++){
		    	if (results.get(i).get("MarketName").equals("BTC-ETH")){
		    		System.out.println(results.get(i));
		    	}else if (results.get(i).get("MarketName").equals("BTC-DASH")){
		    		System.out.println(results.get(i));
		    	}else if (results.get(i).get("MarketName").equals("BTC-LTC")){
		    		System.out.println(results.get(i));
		    	}else if (results.get(i).get("MarketName").equals("BTC-ETC")){
		    		System.out.println(results.get(i));
		    	}else if (results.get(i).get("MarketName").equals("BTC-XRP")){
		    		System.out.println(results.get(i));
		    	}
		    }
		    //System.out.println(results.get(0));

		    
		    returnMap.put("marketList" , results);
		
		} catch (Exception e) {
		    e.printStackTrace();
		}
		ModelAndView mv = new ModelAndView();
		mv.addAllObjects(returnMap);
        mv.setViewName("jsonView");
        return mv;
	}
}
