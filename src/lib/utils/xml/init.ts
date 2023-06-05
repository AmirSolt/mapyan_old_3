import { XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser'





export function convertXMLtoObj(xmlRaw:string){
    let cards:CompareCard[]=[];
    let converted = XMLConverter(xmlRaw)

    console.log("converted",converted)

    converted.s.forEach((section:any) => {
        let card:CompareCard = {heading:section.f,
        items:[]
        }
        section.i.forEach((item:any) => {
            card.items.push({
                asin:item.as,
                paragraph:item.p,
            })
        });
        cards.push(card)
    });

    return cards
}

function XMLConverter(xmlRaw:string){
    const parser = new XMLParser();
    let jObj = parser.parse(getXMLTemplate(xmlRaw));
    return jObj.body
}


function getXMLTemplate(body: string):string {
    return`
<?xml version = "1.0" encoding = "UTF-8"  ?>
<!DOCTYPE body
[
   <!ELEMENT body (s)>
   <!ELEMENT s (f, i)>
   <!ELEMENT f (#PCDATA)>
   <!ELEMENT i (as, p)>
   <!ELEMENT as (#PCDATA)>
   <!ELEMENT p (#PCDATA)>
]>

<body>
${body}
</body>
`
}