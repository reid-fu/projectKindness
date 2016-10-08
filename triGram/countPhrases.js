/*
seperates phrases into TriGram and returns set 
of all words to call. Requires plain text String.
*/

function main(input){
var parse = input.toLowerCase();
var triGramArray = countPhrases(parse);
return triGramArray;
}

//counts total phrases used
function countPhrases(sentence){
//variables used
var nGrams = []
var w1, w2, w3;
var minWords = 0;
var holder;
var check1 = true, check2 = true, check3 = true;

//cut off end line if in sentence
sentence = cutEnd(sentence);

//setting first 3 instances of w1, w2, w3 and getting minWords
for(var i = 0; i < sentence.length; i++){
	if(sentence.charAt(i) == ' ' || i == sentence.length-1){
		minWords++;
	}
	if(minWords == 1 && check1){
		w1 = sentence.slice(0, i);
		holder = i+1;
		check1 = false;
	}
	if(minWords == 2 && check2){
		w2 = sentence.slice(holder, i);
		holder = i+1;
		check2 = false;
	}
	if(minWords == 3 && check3){
		w3 = sentence.slice(holder, i);
		holder = i+1;
		check3 = false;
	}
}

//assigning first Ngrams
nGrams.push(w1);
nGrams.push(w2);
nGrams.push(w3);
nGrams.push(w1 + " " + w2);
nGrams.push(w2 + " " + w3);
nGrams.push(w1 + " " + w2 + " " + w3);

//creating remaining Ngrams
for(var i = holder; i < sentence.length; i++){
	if(sentence.charAt(i) == ' '){
		w1  = w2;
		w2 = w3;
		w3 = sentence.slice(holder, i);
		holder = i+1;
		nGrams.push(w3);
		nGrams.push(w2 + " " + w3);
		nGrams.push(w1 + " " + w2 + " " + w3);
	}
	if(i == sentence.length-1){
		w1  = w2;
		w2 = w3;
		w3 = sentence.slice(holder, i+1);
		nGrams.push(w3);
		nGrams.push(w2 + " " + w3);
		nGrams.push(w1 + " " + w2 + " " + w3);
	}
}

//remove repeats in Array
removeRepeats(nGrams);

//return word to call
return nGrams;
}

//check if final index is ' ' and if so cut off last index
function cutEnd(sentence){
	if(sentence[sentence.length-1] == ' '){
		sentence = sentence.slice(0, sentence.length-1);
	}
	//return to call sentence
	return sentence;
}

//removes repeats in array
function removeRepeats(nGrams){
	//go through entire arrya of nGrams
	for(var i = 0; i < nGrams.length; i++){
		//compare one index to all other indexs'
		for(var j = i+1; j < nGrams.length; j++){
			//if two elements are equals spliace the repeat element at j out
			if(nGrams[i] == nGrams[j]){
				nGrams.splice(j,1);
			}
		}
	}
	//return to call nGrams without repeats
	return nGrams;
}
