<script lang='ts'>

    import SearchInput from '$lib/comp/search/SearchInput.svelte';
    import Banner from '$lib/comp/general/Banner.svelte';


    import ResponseGrid from '$lib/comp/compare/ResponseGrid.svelte';




    // ==================================================================

	let rawResponse = `<s><f> Material </f><i><as>B08XZHS8FF</as> <p>Cotton 46%, Nylon 1%, Polyester 45%, Rayon 7%, Spandex 1%</p></i><i><as>B08PF114QH</as> <p>63% Cotton, 30% Polyester, 4% Nylon, 3% Elastane</p></i><i><as>B07NNTCV5K</as> <p>98% Polyester, 2% Spandex</p></i></s>
<s><f> Machine Washable </f><i><as>B08XZHS8FF</as> <p>Yes</p></i><i><as>B08PF114QH</as> <p>Yes</p></i><i><as>B07NNTCV5K</as> <p>Yes</p></i></s>
<s><f> Cushioned </f><i><as>B08XZHS8FF</as> <p>Yes</p></i><i><as>B08PF114QH</as> <p>Zone Cushioning on the ball and heel of the foot for protection and comfort in high impact areas</p></i><i><as>B07NNTCV5K</as> <p>Unknown</p></i></s>
<s><f> Reinforced Heel and Toe </f><i><as>B08XZHS8FF</as> <p>Extra durable grey reinforced heel & toe</p></i><i><as>B08PF114QH</as> <p>Reinforced heel and toe for long lasting durability</p></i><i><as>B07NNTCV5K</as> <p>Unknown</p></i></s>
<s><f> Moisture Wicking </f><i><as>B08XZHS8FF</as> <p>Moisture wicking helps keep feet cool and dry</p></i><i><as>B08PF114QH</as> <p>Zone Mesh designed for ventilation and breathability to manage moisture and provide comfort</p></i><i><as>B07NNTCV5K</as> <p>Unknown</p></i></s>`

let tableData = {
    "B08XZHS8FF":{
        "asin": "B08PF114QH",
        "title": "Amazon Essentials Men's 6-Pack Performance Cotton Cushioned Athletic No-Show Socks 12-16 Grey Multi",
        "image":"",
        "brand":"",
        "price":{currency:"USD", symbol:"$", value:-1},
        "link":"",
        "rating": 4.2,
        "ratings_total": 8949,
    },
    "B08PF114QH":{
        "asin": "B08PF114QH",
        "title": "Amazon Essentials Men's 6-Pack Performance Cotton Cushioned Athletic No-Show Socks 12-16 Grey Multi",
        "image":"",
        "brand":"",
        "price":{currency:"USD", symbol:"$", value:-1},
        "link":"",
        "rating": 4.2,
        "ratings_total": 8949,
    },
    "B07NNTCV5K":{
        "asin": "B07NNTCV5K",
        "title": "Amazon Essentials Men's 6-Pack Performance Cotton Cushioned Athletic No-Show Socks 12-16 Grey Multi",
        "image":"",
        "brand":"",
        "price":{currency:"USD", symbol:"$", value:-1},
        "link":"",
        "rating": 4.2,
        "ratings_total": 8949,
    },
}

    // ==================================================================


</script>


<!-- <ResponseGrid {rawResponse} {tableData} isStreamed={false}/> -->

<SearchInput searchTerm={''} />

<Banner />