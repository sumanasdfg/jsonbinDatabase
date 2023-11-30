function updateBin(data,binId,key) {
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText );
    }
  }
  let binlocation="https://api.jsonbin.io/v3/b/" + binId;
  req.open("PUT",binlocation, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key",key);
  req.setRequestHeader("X-Bin-Versioning", true);
  req.send(data);
   
}

function deleteBinVersion(binId,key) {
  
  let req =new XMLHttpRequest ();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText );
    }
  } 
  let binlocation = "https://api.jsonbin.io/v3/b/"+binId+"/versions";
  req.open("DELETE",binlocation, true);
  req.setRequestHeader("X-Master-Key",key);
  req.setRequestHeader("X-Preserve-Latest",true);
  req.send();
};

function store(name,dob,gender,email,binId,key) {
  let req = new XMLHttpRequest();
  let person={
    
    dob:dob,
    gender:gender,
    email:email
  }
  

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      
      let receivedData=JSON.parse(req.responseText);
      receivedData[name]=person;
      let finalData = JSON.stringify(receivedData);

      updateBin(finalData,binId,key);
      deleteBinVersion(binId,key); 
      
    }
  }
  let l="https://api.jsonbin.io/v3/b/"+binId+"?meta=false"
  req.open("GET",l, true);
  req.setRequestHeader("X-Master-Key",key);
  req.send()
}
