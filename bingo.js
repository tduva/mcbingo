//var bingoList = [1][34];

var currentSheet = [24];	
var sheetLayout = [];										
						
var amountOfSilly = 1;
var amountOfHard = 5;
var amountOfMedium = 10;

var SEED;
var LAYOUT;

$(document).ready(function()
{	
	$("#bingo td").click(function()
	{
		if ($(this).hasClass('greensquare'))
		{
			$(this).toggleClass('greensquare');
			$(this).toggleClass('redsquare');
		}
		else if ($(this).hasClass('redsquare'))
		{
			$(this).toggleClass('redsquare');
		}
		else
		{
			$(this).toggleClass('greensquare');
		}
		
	});
	
	// Check the url for a seed value
	SEED = gup( 'seed' );
	// If there isn't one, make a new one
	if (SEED == "") 
	{
		// Making a new 5 digit seed
		SEED = Math.floor((Math.random() * 90000) + 10000);
		// Changing the URL to have the seed
		window.location = '?seed=' + SEED;
		// Using history.pushState to avoid reloading the page when changing URL
		//window.history.pushState('', "Sheet", "?seed=" + SEED);
	}
	
	// Setting the random seed
	Math.seedrandom(SEED);
	
	LAYOUT = gup( 'layout' );
	
	if (LAYOUT == "random")
	{
		document.getElementById("LayoutTickbox").checked = true;
	}
	
	if (gup('hidden') == "true")
	{
		document.getElementById("HiddenTickbox").checked = true;
		document.getElementById("bingo").style.display = "none";
	}
	
	generateNewSheet();
})

function generateNewSheet() 
{
  if (LAYOUT == "set")
	{		
		sheetLayout = [ 1, 2, 0, 2, 1,
						2, 0, 1, 0, 2,
						0, 1, 3, 1, 0,
						2, 0, 1, 0, 2,
						1, 2, 0, 2, 1];
	}
	else if (LAYOUT == "random")
	{
		sheetLayout = [ 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0,
						0, 0, 0, 0, 0,
						0, 0, 0, 0, 0,
						0, 0, 0, 0, 0];
						
		for (var i = 0; i < amountOfSilly; i++) 
		{
			sheetLayout[Math.floor((Math.random() * 24))] = 3;
		}
		
		for (var i = 0; i < amountOfHard; i++) 
		{
			var cont = true;
			
			do
			{
				cont = true;
				
				var rng = Math.floor((Math.random() * 24));
			
				if (sheetLayout[rng] == 0)
				{
					sheetLayout[rng] = 2;
				}
				else
				{
					cont = false;
				}
			}
			while (cont == false);
		}
		
		for (var i = 0; i < amountOfMedium; i++) 
		{
			var cont = true;
			
			do
			{
				cont = true;
				
				var rng = Math.floor((Math.random() * 24));
			
				if (sheetLayout[rng] == 0)
				{
					sheetLayout[rng] = 1;
				}
				else
				{
					cont = false;
				}
			}
			while (cont == false);
		}
	}
	else
	{
		LAYOUT = "set";
		
		sheetLayout = [ 1, 2, 0, 2, 1,
						2, 0, 1, 0, 2,
						0, 1, 3, 1, 0,
						2, 0, 1, 0, 2,
						1, 2, 0, 2, 1];
						
		//window.location = '?seed=' + SEED + '&layout=' + LAYOUT;
	}
	
	for (var i=0; i<=24; i++) 
	{		
		var cont = true;
		
		do 
		{
			cont = true;
			
			var rng = Math.floor((Math.random() * bingoList[sheetLayout[i]].length) + 1);
			//var rng = Math.floor((Math.random() * 3) + 1);
			
			if (typeof bingoList[sheetLayout[i]][rng] === 'undefined')
			{
				cont = false;
			}
			else
			{
				for (var z=0; z <= 24; z++)
				{
					if (currentSheet[z] == bingoList[sheetLayout[i]][rng].name)
					{
						//$('#slot'+i).append("Loop ");
						cont = false;
					}	
					
				}
			}
 			
		}
		while (cont == false);
		
		//var rng = Math.floor((Math.random() * bingoList.length - 1) + 1);
		
		currentSheet[i] = bingoList[sheetLayout[i]][rng].name;
		
		$('#slot'+ (i + 1)).append(bingoList[sheetLayout[i]][rng].name);
	}
}

function toggleRandomLayout(cb) 
{
	if (cb.checked)
	{
		LAYOUT = "random";
		window.location = '?seed=' + SEED + '&layout=' + LAYOUT;
	}
	else
	{
		LAYOUT = "set";
		window.location = '?seed=' + SEED + '&layout=' + LAYOUT;
	}
}

function toggleTableHidden(cb) 
{
	if (cb.checked)
	{
		document.getElementById("bingo").style.display = "none";
		window.history.pushState('', "Sheet", '?seed=' + SEED + '&layout=' + LAYOUT + '&hidden=true');
	}
	else
	{
		document.getElementById("bingo").style.display = "table";
		window.history.pushState('', "Sheet", '?seed=' + SEED + '&layout=' + LAYOUT + '&hidden=false');
	}
}

// gup source: www.netlobo.com/url_query_string_javascript.html
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// random source: www.engin33r.net/bingo/random.js
(function(j,i,g,m,k,n,o){function q(b){var e,f,a=this,c=b.length,d=0,h=a.i=a.j=a.m=0;a.S=[];a.c=[];for(c||(b=[c++]);d<g;)a.S[d]=d++;for(d=0;d<g;d++)e=a.S[d],h=h+e+b[d%c]&g-1,f=a.S[h],a.S[d]=f,a.S[h]=e;a.g=function(b){var c=a.S,d=a.i+1&g-1,e=c[d],f=a.j+e&g-1,h=c[f];c[d]=h;c[f]=e;for(var i=c[e+h&g-1];--b;)d=d+1&g-1,e=c[d],f=f+e&g-1,h=c[f],c[d]=h,c[f]=e,i=i*g+c[e+h&g-1];a.i=d;a.j=f;return i};a.g(g)}function p(b,e,f,a,c){f=[];c=typeof b;if(e&&c=="object")for(a in b)if(a.indexOf("S")<5)try{f.push(p(b[a],e-1))}catch(d){}return f.length?f:b+(c!="string"?"\0":"")}function l(b,e,f,a){b+="";for(a=f=0;a<b.length;a++){var c=e,d=a&g-1,h=(f^=e[a&g-1]*19)+b.charCodeAt(a);c[d]=h&g-1}b="";for(a in e)b+=String.fromCharCode(e[a]);return b}i.seedrandom=function(b,e){var f=[],a;b=l(p(e?[b,j]:arguments.length?b:[(new Date).getTime(),j,window],3),f);a=new q(f);l(a.S,j);i.random=function(){for(var c=a.g(m),d=o,b=0;c<k;)c=(c+b)*g,d*=g,b=a.g(1);for(;c>=n;)c/=2,d/=2,b>>>=1;return(c+b)/d};return b};o=i.pow(g,m);k=i.pow(2,k);n=k*2;l(i.random(),j)})([],Math,256,6,52);