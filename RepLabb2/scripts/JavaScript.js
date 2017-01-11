var repLabb = repLabb || {};
repLabb.persons = [{ FirstName: "Arne", LastName: "Arnesson", city: "Helsingborg", age: 33, fullName: function () {return this.FirstName + " " + this.LastName } },
{ FirstName: "Bartil", LastName: "Bartilsson", city: "Malmö", age: 44, fullName: function () {return this.FirstName + " " + this.LastName } }];

repLabb.showPerson = function()
{
    var foundPersons = "";
    for (var i = 0; i < repLabb.persons.length; i++) {
        //foundPersons += persons[i].FirstName + " " + persons[i].LastName + "<br/>";
        foundPersons += repLabb.persons[i].FirstName + " " + repLabb.persons[i].LastName + "<br/>";
    }
    var nbr = repLabb.persons.length;
    document.getElementById("output").className = "unHiddenGreen";
    document.getElementById("output").innerHTML = nbr + " Persons found" + "<br/>" + foundPersons;
   

}

repLabb.searchPerson = function()
{
    var dfd = $.Deferred();
    
    var searchInput = document.getElementById("searchInput").value;
    localStorage.setItem("latestInput", searchInput);
    var foundPersons = "";
    var flag = false;

    for (var i = 0; i < repLabb.persons.length; i++)
    {

        if (repLabb.persons[i].FirstName.toLowerCase() === searchInput.toLowerCase() || repLabb.persons[i].LastName.toLowerCase() === searchInput.toLowerCase())

        {
            foundPersons += repLabb.persons[i].fullName() + "<br/>";
            flag = true;
            
        }
    }
    if (flag === false)
    {
        dfd.reject();
    }
    else if (flag === true)
    {
        document.getElementById("output").className = "unHiddenGreen";
        dfd.resolve();
    }
    
    return dfd.promise();
    
}
repLabb.showSearchField = function()
{
    document.getElementById("searchForm").className = "unHidden";
}

repLabb.getLatestSearch = function()
{
    var latestInput = localStorage.getItem("latestInput");
    document.getElementById("searchInput").value = latestInput;
}
repLabb.showAddForm = function()
{
    document.getElementById("addForm").className = "unHidden";
}

repLabb.addPerson = function()
{
    var fNameInput = document.getElementById("fNameInput").value;
    var lNameInput = document.getElementById("lNameInput").value;
    var cityInput = document.getElementById("cityInput".value);
    var ageInput = document.getElementById("ageInput".value);
    repLabb.persons.push({ FirstName: fNameInput, LastName: lNameInput, city: cityInput, age: ageInput });
    alert(fNameInput + " " + lNameInput + " was added");
}
repLabb.promiseTest = function()
{
    repLabb.searchPerson().then(function () {
     
    },
    function () {
        document.getElementById("output").className = "unHiddenRed";
        document.getElementById("redirect").className = "unHidden";
        document.getElementById("output").innerHTML = "No persons were found!"
    }

    );
}