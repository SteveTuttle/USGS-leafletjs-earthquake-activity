# USGS-leafletjs-earthquake-activity
UNC_data_bootcamp_module_15

## Challenge Description
### Background
> The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

***from the UNC Bootcamp instructions for this challenge***

## Deliverables

#### USGS Earthquake Data for the Past 7 Days
[Link to Earthquake Data website](https://stevetuttle.github.io/USGS-leafletjs-earthquake-activity/)

For this challenge, the goal is to visualize earthquake data provided by the United States Geological Survey (USGS) in a meaningful way. By creating interactive maps, we aim to educate the public and government organizations about seismic activity around the world.

This challenge is divided into two main parts, creating the earthquake visualization and then gathering additional plot data for more robust visualizations. For this challenge, we will primarily use the following technologies:
* HTML
* JavaScript
* Leaflet.js
* D3.js

### Part-1: Create the Earthquake Visualization
* Obtain earthquake data from the USGS GeoJSON Feed page.

![3-Data.png](https://github.com/SteveTuttle/USGS-leafletjs-earthquake-activity/blob/main/Images/3-Data.png)

* Create a map using Leaflet.js that plots earthquake locations based on latitude and longitude.
* Customize the markers to reflect the magnitude and depth of each earthquake.
* Include popups with additional information about each earthquake.
* Create a legend to provide context for the map data

__Basic Earthquake Data Map example__

![2-BasicMap.png](https://github.com/SteveTuttle/USGS-leafletjs-earthquake-activity/blob/main/Images/2-BasicMap.png)

### Part-2: Gather and Plot More Data
* Plot tectonic plate boundaries alongside earthquake data.
* Add additional base maps for users to choose from.
* Organize data into separate overlays with layer controls.

__Earthquake Map with More Advanced Plot Data example__

![5-Advanced.png](https://github.com/SteveTuttle/USGS-leafletjs-earthquake-activity/blob/main/Images/5-Advanced.png)

_Additional Notes_:
The second part of this challenge was completely optional, with no additional points awarded for completion, however, I believed completing this activity would benefit me with new skills.

I am color-blind so I was originally using hex codes I found at _colorbrewer2.org_ that would work best for me to show variations in the __depthMarker__ colors, however, it was brought to my attention that it was more difficult for others to see. I made adjustments until I could find a color scheme that would work for me and people with normal color vision. I did make a few changes to the final __depthMarker__ colors before settling in `logic_5.js` after consulting with my family and getting their opinions. 

## Resources
### Bootcamp References
[Module 15 Instructions](https://bootcampspot.instructure.com/courses/3285/assignments/52228?module_item_id=937020)

Module 15 reference class activities.

Starter_Code
* index.html
* css _folder_
	* style.css
* js _folder_
	* logic.js

***Special Thanks:***
* Jamie Miller
* Mounika Mamindla
* Lisa Shemanciik

### External References
* [Leaflet Tutorials](https://leafletjs.com/examples.html)
* [Leaflet documentation reference](https://leafletjs.com/reference.html)
* [Leaflet: Interactive Choropleth Map](https://leafletjs.com/examples/choropleth/)
* [Leaflet Quick Start Guide](https://leafletjs.com/examples/quick-start/)
* [Leaflet: Layer Groups and Layers Control](https://leafletjs.com/examples/layers-control/)
* [Leaflet Plugins database](https://leafletjs.com/plugins.html)
* [Color Brewer 2.0](https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3)
* [google search](https://www.google.com/)
* [youtube tutorial](https://www.youtube.com/)
