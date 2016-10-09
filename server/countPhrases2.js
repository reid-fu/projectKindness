
var common = ['and', 'is', 'am', 'I', 'where', 'you', 'he', 'she', 'they'];
var commonSet = new Set(common);

exports.count = function count(string){
	var arr = string.trim().split(" ");
	arr= arr.filter(function(elem, pos){
		return !commonSet.has(elem.toLowerCase());
	});	
	if(arr.length > 2){
		var first = arr[0];
		var sec = arr[1];
		var set = new Set();
		for(var i = 0; i < arr.length - 1; i++){
			first = arr[i];
			sec = arr[i + 1];
			set.add(first);
			set.add(sec);
			set.add(arr[i] + " " + arr[i+1]);
		}
		return Array.from(set);
	}
	if(arr.length == 2){
		 arr.push(arr[0] + " " + arr[1]);
		return arr;
	}else{
		//if arrLen == 1
		return arr;
	}
}
