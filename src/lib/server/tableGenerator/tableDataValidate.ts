import {error} from '@sveltejs/kit'

export function convertToTableData(response, productInfos){

    if(!("content" in response)){
        throw error(400, {message: 'Got no response from AI'})
    }
    const convertedResponse:{} = csvToJson(response.content)

    // console.log("convertedResponse",convertedResponse)

    let tableData:any[] = []

    productInfos.forEach((product) =>{
        const response = convertedResponse[product.asin];
        tableData.push({
                "asin":product.asin,
                "brand":product.brand,
                "title":product.title,
                "image":product.image,
                "price": product.price,
                "link":product.link,
                "rating":product.rating,
                "ratings_total":product.ratings_total,
                "response": response
        }) 
    })

    return tableData;

}



function csvToJson(csv){
    var lines=csv.split("\n");
    var result = {};
    var headers=lines[0].split(",");
    for(let i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
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
    if(dataPoint=="true")
        return true
    if(dataPoint=="false")
        return false
    if(dataPoint=="t")
        return true
    if(dataPoint=="f")
        return false
    if(dataPoint.toLowerCase()=="unknown")
        return null
    if(dataPoint=="null")
        return null

    return dataPoint
}