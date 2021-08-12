# datafly-master
An interactive visualization platform that users can check how Covid-19 impact people's life among states in the U.S. (Analysis Using Machine Learning Models) 


DESCRIPTION:

The code folder contains all scripts we created for this project. The folder structure is well self-explanatory. The numbers at the beginning of each folder name indicate the order of running them to replicate our work of preprocessing, data analysis, data analysis results post-processing to prepare input for creating interactive visualization platform, and creating final interactive visualization platform.

We list the languages and packages we used for each part of the project below：  

Data preprocessing: Python(pandas, numpy), R
Data analysis: 
            Mixed-effects model: R(lme4)
            Similarity analysis: Python(Pandas, fastdtw)
Clustering: Python(Scikit-learn, Matplotlib) 
Data Analysis Results Post-processing: Python (Pandas, Json)
Interactive Visualization Platform: JavaScript(Highcharts, Apexcharts, d3, Material-ui)


INSTALLATION

For data preprocessing, data analysis and data analysis results post processing, please make sure all packages listed in their corresponding section are installed before running the script.

For creating interactive visualization platform:
            Download our codes and run it locally
All codes are in master branch https://github.com/vickykyyu/datafly/tree/master
The code can also be found in the subfolder called 06-Interactive Visualization Platform 
Open terminal in project directly and then run
```yarn install```
```yarn start```
Open http://localhost:3000 in CHROME to view it in the browser.
Optional: if you want to deploy our codes to https://vickykyyu.github.io/datafly/  
```npm install gh-pages --save-dev```
```npm run deploy```
Optional: if you want to build your own react app to deploy through github pages (which can create an url link different from https://vickykyyu.github.io/datafly/, follow these steps https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f





EXECUTION

For data preprocessing, data analysis and data analysis results post processing, run the code based on the description of our data process and analysis procedure here: The data is firstly pre-processed by seasonality adjustment and is scaled using the February data as the reference. Data after 2020-Apr are used for further analysis. Mixed-effects models are performed to study the impact of COVID on life perspectives in each state.Similarity analyses are performed to explore the trajectory similarity of life perspectives in each state and the similarity of state-wise trajectory under each life perspective.Clustering is performed to provide detailed information about the characteristics of each life aspect in states by different clusters.

For viewing our interactive visualization platform:
access our project directly on https://vickykyyu.github.io/datafly/ in CHROME or other url links if you build your own react app to deploy on github page.

DEMO VIDEO


APPENDIX
FOLDER DESCRIPTION:
Source of Dataset.txt
01-Data Preprocessing
Preprocessing_Transportation
Web Visualization Preprocessing
Similarity_Test_for_Feature_Selecting
02-Mixed-Effect Model Code
Employment Mix Effect
Entertainment Mix effect
Housing Mix Effect
Transportation Mix Effect
03-Similarity Analysis
Similarity_Analysis-DTW
Similarity_Analysis-CPC
Similarity_Analysis-CPC-DTW-result_report
04-Clustering
Transportation: clustering data and code 
Housing: clustering data and code 
Entertainment: clustering data and code 
Employment: clustering data and code 
Covid: clustering data and code 
Final_ClusterTable: clustering tables 
05-Data Input for Web Visualization
Tab3_DTW: data Input for Web Visualization
Tab3_CPC: data Input for Web Visualization
Tab3_Clustering: data Input for Web Visualization
Web_JSON_output,py: data output
06-Interactive Visualization Platform
src
public
Yam.lock
README.md
Package.json
package-lock.json
