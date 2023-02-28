# Automatic-Category-markerCluster-Map
## General Description
A mapping tool that creates a map and marks every point of data from a data set. These points are automatically sorted by their given category and can be manually hidden/clustered with the layer control menu at the top right. The map also contains a search feature for specific addresses, provides addational information when markers are clicked, and gives the lattitude and longitutde of position wherever the user clicks on the map.

The focus for this project was a proof of concept that a map representing thousands of data points while being user readible was possible. The focus of the project was not put on aesthetics.

## Demo Code + Instructions
[Demo](https://leafletmapdemo.surge.sh/) with list of 724 companies, schools, and parks in the US (deployed with surge.io).

To use this map, follow instructions on how to use plugin for marker clustering at https://github.com/Leaflet/Leaflet.markercluster . In my code, I moved the `dist` folder out of the `Leaflet.markercluster-1.4.1` folder and into the same space as the programs. (I also have `nonde_modules` but I am not sure where it came from)
The demo code provided has four different map layouts for the user to select from, and automatically has clustering selected to reduce lag when the map is opened. It also randomly assaigns a color to different NAICS codes and to the marker points; the color is shown in the layer control which also acts as a legend. 

![LeafletDemonstration](https://user-images.githubusercontent.com/93101107/184181320-b4b88487-e60b-42dc-ac5c-4b97ba823dc0.gif)

## Opportunities for Optimization / Customization
The demo code uses circle markers instead of the regular upside-down tear-drop marker because circle markers reduce lag and can be easily colored. When the map is actually implemented, the markers could be changed to custom icons represeanting NAICS industries. 

Categories are also given a random color when the map is loaded, which is sub-optimal. If circle markers are kept, then specific colors should be chosen for the different categories. The radius and opacity of the circle markers can also be changed based on preference. Otherwise, custom markers should be used based on different needs.

In the demo code, four terrein textures are provided. These can be changed and more textures can be added to further the user experience. More free textures can be found at https://leaflet-extras.github.io/leaflet-providers/preview/. Some maps require an API key in order to use them. Also, for some maps, the names in the countries are represeanted by thier native language instead of english.

The clustering feature right now does not apply to the various industry layers applied; in the future clustering could be made to apply only to selected layers.

## Geocoding services
The two geocoding services I've found that should are the best financially would be Geocodio and Esri. Geocodio provides 2,500 free addresses per day and $0.50 for every thousand after. Esri provides 20,000 free addresses and $0.50 for every thousand after. Both are relatively fast compared to other services.

## General Notes
I removed the data points in my demo dataset that did not have a lattitude and longitutde. These points did not have lat/longs partly because I used a free geocoding service and partly because the addresses given from the Excel sheet may be insufficient. Points with invaled lat/longs will automatically be placed at lattitude 0 and longitude 0 on the map.

Make sure that the addresses or names provided from the Stocks List do not have any commas in them, as the program can reads CSV files. Commas can be removed with a little Excel magic. Also, make sure that there are no empty lines in the CSV file, as this will result in an error.

## Small Bio of Volodymyr Agafonkin, Leaflet Creator

Eleven years ago, Volodymyr Agafonkin gave the world the gift of Leaflet, the internet's number one open-source library for interactive web maps. His maps are used and trusted by the likes of The European Commission, NPR, The Washington Post, GitHub, Facebook, and Edugion. Along with being a software engineer, he is also a talented musician, proud father of twins, and citizen of Ukraine. However, Volodymyr now no longer resides in his home city of Kyiv ever since Russian forces invaded. Volodymyr has been providing information for others on how they can support Ukraine and better inform themselves from the perspective of a Ukrainian citizen. His tool, Leaflet, has even been used for documenting Russia's war crimes and for coordinating humanitarian efforts. Volodymyr has made immeasurable contributions for the world, and he continues to develop 40+ open-source projects for the betterment of everyone.

If you wish to help Ukraine, the official Leaflet website recommends donating to the Come Back Alive charity. In Volodymyr's own words, "If you want to help, educate yourself and others on the Russian threat, follow reputable journalists, demand severe Russian sanctions and Ukrainian support from your leaders, protest war, reach out to Ukrainian friends, donate to Ukrainian charities. Just don’t be silent."
