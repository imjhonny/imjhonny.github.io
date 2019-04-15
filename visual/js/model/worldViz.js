class WorldViz{

  constructor(){
    this.currentValue = "Religion";
    this.currentWave = "1995-1998";
    this.countries = [];
    this._observers = [];
    this.currentData =new Object();


  }

  // _observers
  //add observers to the model
  addObserver(observer){
    this._observers.push(observer);
   }
   //remove observer from the observers list
   removeObserver(observer){
     return this._boservers.filter(obs => obs !== observer);
   }
   // USE this function to notify all observers the changes
   notifyObservers(changeDetails) {
      for(var i=0; i<this._observers.length; i++) {
            this._observers[i].update(this, changeDetails);
      }
    }


  getCurrentValue(){
    return this.currentValue;
  }

  getDataCountry(countryId){
    // let keys = Object.keys(this.currentData.data);
    //   console.log(keys);
    // for(let key in keys){
    //   console.log(key);
    //   if(key == countryId){
    //     console.log("iguales", key, countryId);
    //   }
    // }
    // return this.data[countryId];
  }

  setCurrentValue(newVal){
    this.currentValue = newVal;
    this.loadValue();
    this.notifyObservers({type:"newValue", value:this.currentValue})
  }

  getCurrentWave(){
    switch (this.currentWave) {
      case "1995-1998":
        return "wave3";
        break;
      case "1999-2004":
        return "wave4";
        break;
      case "2005-2009":
        return "wave5";
        break;
      case "2010-2014":
        return "wave6";
        break;
      default:
        return "wave3"

    }
  }

  setCurrentWave(newWave){
    this.currentWave = newWave;
    this.loadValue();
    this.notifyObservers({type:"newWave", value:this.currentWave});
  }

  getCountries(){
    return this.countries;
  }

  // country: is the country id
  addCountry(countryId){
    //add country only if it does not exist
    if(this.countries.filter(country => (country === countryId)).length == 0){
      this.countries.push(countryId);
      let countryInfo = this.getCountryInfo(countryId);
      this.notifyObservers({type:"newCountry", value:countryInfo});
    }
  }


  removeCountry(countryId){
    this.countries = this.countries.filter(id => id !== countryId);
    this.notifyObservers({type:"removeCountry", value:countryId});
  }

  getCountryInfo(countryId){
    let info = new Object();
    let keys = Object.keys(this.currentData.data);
    for(let key in keys){
      let countryName = keys[key];
      if( countryName == countryId && this.currentData.data[countryId].values.length >1){
        info.name = countryName;
        info.data = this.currentData.data[countryId];
      }
    }
    // let info = this..filter(person => person.age > 18);
    return info;
  }

  loadValue(){
    let val_lower_case = this.getCurrentValue().toLowerCase();
    let model = this;
    this.currentData=new Object();
    this.currentData.data=new Object();
    d3.csv(`/assets/${this.getCurrentWave()}/${val_lower_case}.csv`,function(data){
      model.parseData(data);
      // updateMap(mapa);
    },function(error, rows){
        // console.log("error",error);
        // console.log("rows",rows);
    });
  }

  // read data and create an dictionary with all the proper information
  parseData(data){
    let keys = Object.keys(data);
    if(this.currentData != null){
      this.notifyObservers({type:"cleanMap", value:this.currentData});
    }
    for(let key in keys){
      let countryName = keys[key];
      let countryIso ="";
      let categoryName = data["category"].replace(/\s/g, '');
      let categoryStringName = data['category'];
      if( countryName != "category" && countryName != "total"){
        countryIso = getISOByName(countryName);
        if(this.currentData.data[countryIso]==null){
          this.currentData.data[countryIso]={
            name: countryName,
            fillKey: 'NotAtAllImportant',
            values:[]
          };
        }
        if(categoryStringName != "(N)"){

          let category = {
            fill:categoryName,
            name:categoryStringName,
            value:data[countryName]
          }
          this.currentData.data[countryIso].values.push(category);
          // set category of importance
          if(this.currentData.data[countryIso].values.length>1)this.checkHighData(this.currentData.data[countryIso]);
        }
      }
    }

    this.notifyObservers({type:"newData", value:this.currentData});
  }

  checkHighData(currentCountry){
    let highest = "Veryimportant";
    let val = 0;
    for(let i=0; i< currentCountry.values.length;i++){
      if(parseFloat(currentCountry.values[i].value) > val && parseFloat(currentCountry.values[i].value)<100){
        highest = currentCountry.values[i].fill;
        val = parseFloat(currentCountry.values[i].value);
      }
    }
    if(highest=="(N)"){highest = "NoAnswer"}
    currentCountry.fillKey = highest;

  }

  // remove fills in all countries in order to refill new data`
  getCleanData(){
    let tempData = new Object();
    tempData.data = new Object();

    let keys = Object.keys(this.currentData.data);
    for(let key in keys){
        tempData.data[keys[key]]={
        fillKey: 'defaultFill',
      };
    }
    return tempData;
  }


}
