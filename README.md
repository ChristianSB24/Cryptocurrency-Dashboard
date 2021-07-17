# Cryptocurrency Dashboard
Link to project: [Cryptocurrency_Dashboard](https://cryptocurrency-dashboard2.herokuapp.com/).

In this project a user is able to select some of the top cryptocurrencies and view historical and current pricing. 

The frontend was developed with React and Redux and React Hooks for state management. Fetching calls were made to the Coinbase API to retrieve historical pricing. A websocket channel was created with the Coinbase Websocket Feed to retrieve real-time prices. The Chart.js library was utilized to render historical and real-time pricing instantly. Finally, React Slick was used to create a carousel for the cryptocurrencies that users can click on to render their charts.

## Images of the application
When first loading the application users can see a carousel of the top cryptocurrencies. 
![Carousel](/images/dashboard1.PNG)
After clicking on the currency users can see a chart of the pricing. They have the option to see different timesegments such as 5 hours, 3 days, 2 weeks, and 10 months. Only the 5 hour chart provides real-time pricing. 
![Chart](/images/dashboard2.PNG)

## Ongoing work
In the future I want to add an API that users can set up alerts for different cryptocurrencies. 


