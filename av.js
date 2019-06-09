//const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');
const axios = require("axios");
const opn = require('opn');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const BASED_URL = 'https://www.52av.tv/';
const MAX_VIEW_NUMBER = 50000;
const MIN_VIEW_NUMBER = 40000;

const START_PAGE = 100;
const END_PAGE = 120;
let result = [];

function pageList(){
	let promises = [];
	for(let i=START_PAGE;i<=END_PAGE;i++){
		let links = `https://www.52av.tv/forum-64-`+i+`.html`;
		promises.push(links);	
	}
	return promises;
}

function getSinglePage(url){
	let data = [];
	axios.get(url).then((response) => {
		let content = null;
		let links = [];
		let count = 0;
		let $ = cheerio.load(response.data, {decodeEntities: false});
		$('.waterfall li').each(function(i, elm) {
	    	let info = '';
	    	info = $(this).find('cite').text().trim();
	    	info = info.replace(/\s+/g, '');
	    	let startPos = 3;
	    	let endPos = info.indexOf("回");
	    	let views = parseInt(info.substring(startPos,endPos));
	    	let link = BASED_URL+$(this).find('.cl').find('a').attr('href');
	    	//console.log('<a href='+link+'></a>');
	    	if(views>MIN_VIEW_NUMBER && views < MAX_VIEW_NUMBER){
	    		//count++;
	    		content = {
		    		"link": link,
		    		"info": info,
		    		"views":views
				}	
				if(content!=null){
					data.push(content);
				}
		    	//opn(link);
			}
		});
		if(data.length!=0){
			//result.push(data);
			console.log(data);
			return data;
		}	
    },
    (error) => console.log(err));
}

let urls = pageList();
(async function () {
	await axios.all(urls.map( url => { 
		getSinglePage(url);
	}));
	//console.log(result);
}());


// .then(axios.spread(function (acct, perms) {
//   	console.log('acct*****',acct, perms);
//  }));

//window.open("https://www.52av.tv/forum-64-1.html");

//opn('https://www.52av.tv/forum-64-1.html');

// axios.all(pageList().map(async url =>{
// 	getSinglePage(url);
// })
//   .then(axios.spread(function (acct, perms) {
//   	console.log(acct);
//   });
// axios.get(`https://www.52av.tv/forum-64-1.html`)
//     .then((response) => {
//         if(response.status === 200) {
// 	        const html = response;
// 	        const $ = cheerio.load(html); 
// 	        console.log($(this));
//     	}
//     }, (error) => console.log(err) );

	

	
	//console.log(str);
	//let content = $('.waterfall li').html();
	// console.log("total", count);
	
	// for(let a of content){
	// 	views.push( a.find("cite").map(function(i,e){
	// 		return $(this).text();
	// 	}))
	// 	//console.log(a.find("cite").html());
	// }
	// console.log(views[0]);
	//console.log(content);
//})