/*JS Add Expenditure*/
var formData = [];
 
var storageModuleFunc = (function(){//the module of the memory
	
	var resetStorage = function(){ //reset the local storage
		var answer = confirm("Pressing OK will delete all your expenditures from the list!");
			if(answer === false)
				return;
			if(localStorage.getItem("Data") != undefined) //remove the data from the memory
				localStorage.removeItem("Data");
	//	var formData = [];
		localStorage.setItem("Data",JSON.stringify(formData)); 
		expendsModuleFunc.fillList();
		$("#form").hide();
		$(".formPic").fadeTo(0, 1);
	};

	var addToLocalStorage = function(formData){  //Adding features and values into memory
		$("#formCover").hide();
		var itemsStr = localStorage.getItem("Data");
		var itemsObj = JSON.parse(itemsStr);  
		if(itemsStr == null){ //If the object does not yet exist in the memory
			itemsObj = [];
			itemsObj.push(formData);
		}
		else{
			itemsObj.push(formData);
		}
		localStorage.setItem("Data", JSON.stringify(itemsObj));//Updating the information in the memory
	};
	return{
		resetStorage: resetStorage,
		addToLocalStorage: addToLocalStorage
	};
})();


var expendsModuleFunc = (function(){
	
	var expendListener = function(e){//listener for expenditure selected
		var nameOffExpenditure = e.target.id; 
		var element1 = document.getElementById(nameOffExpenditure);
		if(element1 != "td")
			nameOffExpenditure = element1.parentNode.getAttribute("id");
		$(".formPic").fadeTo(500, 0.3);
		$("#NameOffOneExpenditure").text(nameOffExpenditure);
		$("#formCover").hide();
		$("#form").hide();
		$("#form").fadeIn(500);
	};
	
	var onfocused = function(){
		if($("#Payment") != "" && $("#sum").val() != "" && $("#Date").val() != "" && $("#Details").val() != ""){
			$("#cmdSubmit").attr("disabled",false);
			document.getElementById("cmdSubmit").style.cursor = "pointer";
		}
		else{
			return;
		}
	};
	
	var fillSmallList = function(formData, nameOffEx){  //fill the list of one type of expenditure
		$("#formCover").hide();
		var totalOne = 0;
		$(".list2").remove();
		var list = JSON.parse(localStorage.getItem("Data"));
		$.each(list, function(i, formData){
			if(formData.nameOffEx == nameOffEx){
				var oneRow = '<tr class = "row"><td class = "list2">' +  
				formData.Details + '</td><td class = "list2">' + formData.date + '</td><td class = "list2">' +formData.sum+
				'</td><td class = "list2">'+formData.payment +"</td></tr>";
				$("#listTD").last().after(oneRow); //Put the new line to the list
				totalOne += parseInt(formData.sum);	//updating the total amount of this list
			}
		});
		$("#oneTotalSum2").text(totalOne);
		$("#formCover").hide();
	};
	
	var viewList = function(e){ //view the list of the exist expenditures
		if(e.target.id == "seeTheList"){ //see the list
			$("#formCover").hide();
			$("#container").fadeIn(50);
			//$(".exp").attr("disabled",true);
			$("div").not(".containerStyle").fadeTo(5, 0.25);
		}
		if(e.target.id == "listExpenditureButton" || e.target.id == "list2ExpenditureButton" ){ //view the list in the FinalProject page
			$("#finalContainer").fadeIn(50);
		}
		if(e.target.id == "hideTheList"){ //hide the list
			$("#container").hide();
			$("div").not("#container").fadeTo(5, 1);
			$("#formCover").hide();
		}
		if(e.target.id == "finalHideTheList"){ //hide the list in the FinalProject page
			$("#finalContainer").hide();
			//$("div").not(".containerStyle").fadeTo(5, 0.25);
		}
		if(e.target.id == "allOneKind"){//see just the list of one type of expenditure
			expendsModuleFunc.fillSmallList(formData, $("#NameOffOneExpenditure").html());
			$("#formCover").fadeIn(10);
		}
	};
	
	var fillList = function(){ // Create a list of memory data
		$("#formCover").hide();
		var total = 0;
		$(".list").remove(); //clear the display
		var listOfExpnd = JSON.parse(localStorage.getItem("Data")); //to an object
		$.each(listOfExpnd, function(i, formData){
			var newRow = '<tr class = "rowList"><td class = "list">' + (i+1) + '</td ><td class = "list">' + 
			formData.nameOffEx + '</td ><td class = "list">' + 
			formData.Details + '</td><td class = "list">' + formData.date + '</td><td class = "list">' +formData.sum+
			'</td><td class = "list">'+formData.payment +"</td></tr>";
			$("tr").last().after(newRow);//Put the new line to the list
			total += parseInt(formData.sum);//Updating the total amount of all expenses
		});
		$("#summry2").text(total); //Puts the total amount in the AddExpenditure page
		$("#finalSummry2").text(total);  //Puts the total amount in the FinalProject page
	};
	
	var formInput = function(){  //Creates an object that contains the data entered in form fields
		var Details = $("#Details").val();
		var date = $("#Date").val();
		var sum = $("#sum").val();
		var payment = $("#Payment").val();
		var nameOffEx = $("#NameOffOneExpenditure").html();
		formData = {Details:Details, date: date, sum:sum ,payment:payment, nameOffEx:nameOffEx};
		storageModuleFunc.addToLocalStorage(formData); //Introduces memory
		expendsModuleFunc.fillList(); //Updates the list
		expendsModuleFunc.fillSmallList(formData, nameOffEx); //Update the list of specific expenditure
	};
	
	return{
		expendListener: expendListener,
		fillSmallList: fillSmallList,
		viewList: viewList,
		fillList: fillList,
		formInput: formInput,
		onfocused: onfocused		
	};
})();

$("document").ready( function() { //Started after loading
	
	$("#finalContainer").hide();
	$("#container").hide();      
	$("#formCover").hide();
	$("#form").hide();
	$(".exp").click(expendsModuleFunc.expendListener);
	$("#cmdSubmit").attr("disabled",true);

	//AddExpenditure page
	$("#back").attr("href", "file:///C:/Users/ishay/Documents/Final%20Project/Final%20Project.html");
	$("#cmdSubmit").click(expendsModuleFunc.formInput);
	$("#resetMemmory").click(storageModuleFunc.resetStorage);
	$("#seeTheList").click(expendsModuleFunc.viewList);
	$("#hideTheList").click(expendsModuleFunc.viewList);
	$("#allOneKind").click(expendsModuleFunc.viewList);
	$("#Details").blur(expendsModuleFunc.onfocused);
	$("#Date").blur(expendsModuleFunc.onfocused);
	$("#sum").blur(expendsModuleFunc.onfocused);
	$("#Payment").blur(expendsModuleFunc.onfocused);//???????????????
	
	//FinalProject page
	$("#listExpenditureButton").click(expendsModuleFunc.viewList);
	$("#list2ExpenditureButton").click(expendsModuleFunc.viewList);
	$("#finalHideTheList").click(expendsModuleFunc.viewList);
	$("#finalResetMemmory").click(storageModuleFunc.resetStorage);
	
	expendsModuleFunc.fillList();	
	$("#formCover").hide();
}); 



