# indexer updates
- should add total lp token supply to market
- should have lp token metadata in market
- should explicitly define the underlying token, yield bearing token, wrapped token.
- need icons for the market token and other respective tokens
- need better tickers for each token

# cleanup notes
- more responsive layout for larger screens (pretty bad rn)
- code cleanup lint errors
- fill in placeholder data in the market cards and trade summary
- fix etherscan links (using op sepolia, should be mainnet?)


# market notes
- spot price tracks expected interest paid to the yts to maturity
- yt has interest rate and expiry
- yt interest is all the interest paid on an asset until maturity, not compounding
- yt instrument is valued with time dimension, so itd be the interest rate formula, e^rt
- principal token is a claim on the underlying asset that is generated the yield. 
- principal token's terminal value is 1 asset because the interest isnt accrued to the yt anymore, no more yield to earn on the yt side.
- okay so the yield is the time value of the prinicpal token's interest rate/yield rate.
- SY has ASSET, SY exchange rate is ASSET per SY.
- market is x = SY, y = PT.
- market spot price is how much PT you get per ASSET, but its settled as SY.
- ASSET is stETH. stTH rebases interest rewards (increasing balance).
- Principal token represents a claim on 1 stETH at maturity.
- market spot price is greater than or equal to 1, because we get more principals out for 1 ASSET.
- market gives us price discovery on PT, which implies a YT rate/price.
- at maturity, the market price should be constant at a strike price of 1 at maturity. we target constant price of 1 at maturity, which means you get one PT per asset and one asset per PT. Handing in one PT and getting 1 stETH.
- map the appropriate decay onto the strike price, trying to map the strike price on the expected return of YT at time t.
