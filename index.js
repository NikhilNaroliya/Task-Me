const taskContainer=document.querySelector(".task_container");

 globalstore=[];

const generateNewCard=(taskdata)=>
`<div class="col-md-6 col-lg-4" id=${taskdata.id}>
        <div class="card text-center">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pencil"></i></button>
                <button type="button" class="btn btn-outline-danger"id=${taskdata.id} onclick="deletecard.apply(this,arguments)"><i class="fa-solid fa-trash-can" id=${taskdata.id} onclick="deletecard.apply(this,arguments)"></i></button>
            </div>
            <!-- card image code -->
            <img src=${taskdata.imageurl} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p  ${taskdata.TaskDescription}</p>
              <a href="#" class="btn btn-primary">${taskdata.TaskType}</a>
            </div>
            <div class="card-footer ">
                <button type="button" class="btn btn-primary float-end">Open Task </button>
            </div>
          </div>
    </div> 
    `;

const loadinitialcarddata=()=>{
    //localstorage to get tasky card data
    const getcarddata=localStorage.getItem("tasky");
    // convert from string to normal  object
    const{cards}=JSON.parse(getcarddata);
    //loop over those array of task object to create HTML card,inject it to dom
    cards.map((cardObject)=>{
        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
        //update our globalstore
        globalstore.push(cardObject);
    })

}
const savechanges=()=>
{
    const taskdata =
    {
        id:`${Date.now()}`, //unique number for id
        imageurl:document.getElementById("imageurl").value,//in order to insert only value inside any field we use value 
        TasTitle:document.getElementById("tasktitle").value,
        TaskType:document.getElementById("tasktype").value,
        TaskDescription:document.getElementById("taskdescription").value,
    };

    

        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskdata));
             globalstore.push(taskdata);
             //we are storing in local storage

             //localStorage.setItem(globalstore);
          
             // this is wrong  kyuki hume id provide karni hogi
             //json needs an object to stringyfy 
                    localStorage.setItem("tasky",JSON.stringify({cards:globalstore}));
};
        const deletecard=(event)=>{
            event=window.event;
            //id
            const targetid=event.target.id;
            const tagname=event.target.tagname;
            //match the id of the element with id inside the globalstore
            // if match found remove
            globalstore=globalstore.filter((cardObject)=> cardObject.id!==targetid);
//here we are updatig the new array after deleting the items 
            localStorage.setItem("tasky",JSON.stringify({cards:globalstore}));
            
            if(tagname=="BUTTON")
            {
                return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
            }
            else{
            return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
            }
        }


//parent object of browser is known as window 
//parent obj of dom is known as document