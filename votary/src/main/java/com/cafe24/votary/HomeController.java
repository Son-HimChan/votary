package com.cafe24.votary;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cafe24.votary.bithum.bithumClient;

import org.knowm.xchange.Exchange;
import org.knowm.xchange.ExchangeFactory;
import org.knowm.xchange.ExchangeSpecification;
import org.knowm.xchange.bitstamp.BitstampExchange;
import org.knowm.xchange.bitstamp.dto.marketdata.BitstampTicker;
import org.knowm.xchange.bitstamp.service.BitstampMarketDataServiceRaw;
import org.knowm.xchange.bittrex.v1.*;
import org.knowm.xchange.bittrex.v1.dto.marketdata.BittrexTicker;
import org.knowm.xchange.bittrex.v1.service.BittrexMarketDataServiceRaw;
import org.knowm.xchange.currency.CurrencyPair;
import org.knowm.xchange.dto.marketdata.Ticker;
import org.knowm.xchange.service.marketdata.MarketDataService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 * 
	 * @throws IOException
	 */
	@RequestMapping(value = "/main.do", method = RequestMethod.GET)
	public String home(Locale locale, Model model) throws IOException {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);
		bithumClient api = new bithumClient("2a568fe1d0b84c094dd5a3ba67632dcd", "16f2d439aeb38998f3a55ca55b2663a0");

		HashMap<String, String> rgParams = new HashMap<String, String>();
		rgParams.put("currency", "BTC");
		try {
			String result = api.callApi("/info/balance", rgParams);
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// rgParams.put("payment_currency", "KRW");
		// Use the factory to get Bitstamp exchange API using default settings
		ExchangeSpecification bittrexSpec = new ExchangeSpecification(BittrexExchange.class);
		bittrexSpec.setSslUri("https://bittrex.com/api/");
		bittrexSpec.setHost("bittrex.com");
		bittrexSpec.setPort(80);
		bittrexSpec.setExchangeName("Bittrex");
		bittrexSpec.setExchangeDescription("Bittrex is a bitcoin and altcoin exchange.");

		/*
		 * Exchange bittrex =
		 * ExchangeFactory.INSTANCE.createExchange(bittrexSpec);
		 * 
		 * // Interested in the public market data feed (no authentication)
		 * MarketDataService marketDataService = bittrex.getMarketDataService();
		 * 
		 * try { //generic(marketDataService); raw((BittrexMarketDataServiceRaw)
		 * marketDataService); } catch (IOException e1) { // TODO Auto-generated
		 * catch block e1.printStackTrace(); } try { String result =
		 * api.callApi("/info/balance", rgParams); System.out.println(result); }
		 * catch (Exception e) { e.printStackTrace(); }
		 */

		// Use the factory to get Bitstamp exchange API using default settings
		Exchange bitstamp = ExchangeFactory.INSTANCE.createExchange(BitstampExchange.class.getName());

		// Interested in the public market data feed (no authentication)
		MarketDataService marketDataService = bitstamp.getMarketDataService();

		generic(marketDataService);
		raw((BitstampMarketDataServiceRaw) marketDataService);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}

	@RequestMapping(value = "/votary/getTest.do", method = RequestMethod.GET)
	public Model getTest(Locale locale, Model model) throws IOException {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);
		model.addAttribute("serverTime", formattedDate);

		return model;
	}

	private static void generic(MarketDataService marketDataService) throws IOException {

		Ticker ticker = marketDataService.getTicker(CurrencyPair.BTC_USD);

		System.out.println(ticker.toString());
	}

	private static void raw(BitstampMarketDataServiceRaw marketDataService) throws IOException {

		BitstampTicker bitstampTicker = marketDataService.getBitstampTicker(CurrencyPair.BTC_USD);

		System.out.println(bitstampTicker.toString());
	}
}
