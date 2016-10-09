/*
seperates phrases into TriGram and returns set 
of all words to call. Requires plain text String.
*/

//main call function
function main(input){
//only get lower case of sentence identified
var parse = input.toLowerCase();
//get array of phrases
var triGramArray = countPhrases(parse);
//return array to call
return triGramArray;
}

//counts total phrases used
function countPhrases(sentence){
//variables used
var nGrams = [];
var w1, w2, w3;
var holder = 0;
var totlen = sentence.length+1;

//take off all extra white space between and around sentence
sentence = sentence.replace(/\s+/g, " ");

//setting first 3 instances of w1, w2, w3
for(var i = 0; i < totlen && nGrams.length < 3; i++){
		if(sentence.charAt(i) == ' '){
			nGrams.push(sentence.slice(holder, i));
			holder = i+1;
		}
}

//assigning first Ngrams
w1 = nGrams[0];
w2 = nGrams[1];
w3 = nGrams[2];
nGrams.push(w1 + " " + w2);
nGrams.push(w2 + " " + w3);
nGrams.push(w1 + " " + w2 + " " + w3);

//creating remaining Ngrams
for(var i = holder; i < totlen; i++){
	if(sentence.charAt(i) == ' '){
		w1 = w2;
		w2 = w3;
		w3 = sentence.slice(holder, i);
		holder = i+1;
		nGrams.push(w3);
		nGrams.push(w2 + " " + w3);
		nGrams.push(w1 + " " + w2 + " " + w3);
	 }
}

//remove repeats from array
var setNgrams = new Set(nGrams);
nGrams = Array.from(setNgrams);

//return word to call
console.log(nGrams);
return nGrams;
}
