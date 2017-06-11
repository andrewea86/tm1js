function tm1flat(tm1o,attrs,bFilter){
       //function to convert array into object
       function toObject(val,label) {
          var obj = {};
          for (var i = 0; i < label.length; i++)
            if (val[i] !== undefined && label[i] !== undefined ) obj[label[i]] = val[i];
          return obj;
       }
       //========================================================
       //collect all dimensions from rows and columns
       //1) dimensions on columns
       var dims=[];   
       for (var i=0;i<tm1o.Axes[1].Hierarchies.length;i++){
           dims.push(tm1o.Axes[1].Hierarchies[i].Name);
       }
       //2)dimensions on rows 
       for (var i=0;i<tm1o.Axes[0].Hierarchies.length;i++){
           dims.push(tm1o.Axes[0].Hierarchies[i].Name);
       }
       //3)OPTIONAL.filters
       if(bFilter != null && bFilter==true){
           for (var i=0;i<tm1o.Axes[2].Hierarchies.length;i++){
               dims.push(tm1o.Axes[2].Hierarchies[i].Name);
           }
       }
       //4)add value to the list of dimensions
       dims.push('TM1CubeValue');
       //create auxilary arrays. rc is the main one. it contains all reference points + value as the last element.tm1fo is the array to be returned.
   var r1=[],
       c1=[],
       rc=[];
   var cellCount=0;
   var tm1fo=[];
   
   //loop through rows
   for(var j=0;j<tm1o.Axes[1].Tuples.length;j++){
       for(var j1=0;j1<tm1o.Axes[1].Tuples[j].Members.length;j1++){
         if(attrs != null && tm1o.Axes[1].Tuples[j].Members[j1].Attributes[attrs[tm1o.Axes[1].Hierarchies[j1].Name]] != null){
             r1.push(tm1o.Axes[1].Tuples[j].Members[j1].Attributes[attrs[tm1o.Axes[1].Hierarchies[j1].Name]]);
         }
         else{
             r1.push(tm1o.Axes[1].Tuples[j].Members[j1].Name); 
         }
       }
       //loop through columns
       for(var k=0;k<tm1o.Axes[0].Tuples.length;k++){
           for(var k1=0;k1<tm1o.Axes[0].Tuples[k].Members.length;k1++){
               if(attrs != null && tm1o.Axes[0].Tuples[k].Members[k1].Attributes[attrs[tm1o.Axes[0].Hierarchies[k1].Name]] != null){
                   c1.push(tm1o.Axes[0].Tuples[k].Members[k1].Attributes[attrs[tm1o.Axes[0].Hierarchies[k1].Name]]); 
               }
               else{
                   c1.push(tm1o.Axes[0].Tuples[k].Members[k1].Name);
               } 
           }
         rc=r1.concat(c1);
           
         //include filter values
         if(bFilter != null && bFilter==true){
             for(var m=0;m<tm1o.Axes[2].Tuples[0].Members.length;m++){
                 if(attrs != null && tm1o.Axes[2].Tuples[0].Members[m].Attributes[attrs[tm1o.Axes[2].Hierarchies[m].Name]] != null){
                     rc.push(tm1o.Axes[2].Tuples[0].Members[m].Attributes[attrs[tm1o.Axes[2].Hierarchies[m].Name]]);
                 }
                 else{
                     rc.push(tm1o.Axes[2].Tuples[0].Members[m].Name);
                 }
             }
         }
         //add value from Cells
         rc.push(tm1o.Cells[cellCount].Value);
         //console.log(rc);
         
         tm1fo.push(toObject(rc,dims));
         cellCount+=1;
         
         //zero out auxilary arrays
         c1=[];
         rc=[];  
       }
       r1=[];
   }
   
   //console.log(tm1fo);
   return tm1fo;
};