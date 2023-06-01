import {error} from '@sveltejs/kit'


// export async function convertNSaveTable(tableKey, productInfos){

//     let tableData = convertToTableData(productInfos)


//     const response = await fetch('/api/db/save-tableData', {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             tableKey,
//             tableData,
//         })
//     });
    
//     if (!response.ok) {
//         const data = await response.json();
//         console.log(data)
//         throw error(400, `failed to save table Data:${data.toString()}`);
//     }
// }





export function convertToTableData(productInfos){


    let tableData:{} = {}

    productInfos.forEach((product) =>{
        tableData[product.asin] = {
                "asin":product.asin,
                "brand":product.brand,
                "title":product.title,
                "image":product.image,
                "price": product.price,
                "link":product.link,
                "rating":product.rating,
                "ratings_total":product.ratings_total,
        }
    })

    return tableData;

}



function csvToJson(csv){
    const spliter = "|"
    var lines=csv.split("\n");
    var result = {};
    var headers=lines[0].split(spliter);
    for(let i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(spliter);
        for(let j=1;j<headers.length;j++){
            let data = convertDataType(currentline[j])
            obj[headers[j]] = data;
        }
        result[currentline[0]] = obj
    }
    return result
}


function convertDataType(dataPoint){

    if(dataPoint === undefined)
        return null
    if(dataPoint.toLowerCase()=="true")
        return true
    if(dataPoint.toLowerCase()=="false")
        return false
    if(dataPoint.toLowerCase()=="t")
        return true
    if(dataPoint.toLowerCase()=="f")
        return false
    if(dataPoint.toLowerCase()=="unknown")
        return null
    if(dataPoint.toLowerCase()=="null")
        return null
    if(dataPoint.toLowerCase()=="n/a")
        return null

    return dataPoint
}