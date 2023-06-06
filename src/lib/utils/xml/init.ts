import { XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser'
import type {X2jOptions} from 'fast-xml-parser'




export function convertXMLtoObj(xmlRaw:string){
    let cards:CompareCard[]=[];
    let converted = XMLConverter(xmlRaw)


    if(converted.s){
        converted.s.forEach((section:any) => {
            let card:CompareCard = {heading:section.f,
            items:[]
            }
    
            if(section.i){
                section.i.forEach((item:any) => {
                    card.items.push({
                        asin:item.as,
                        paragraph:item.p,
                    })
                });
            }
    
            cards.push(card)
        });
    }


    return cards
}




function XMLConverter(xmlRaw:string){

    const alwaysArray = [
        "s",
        "i"
    ];
    
    const options:Partial<X2jOptions> = {
        ignoreAttributes: true,
        isArray: (jpath) => { 
            if( alwaysArray.indexOf(jpath) !== -1) return true;
            return false
        }
    };

    const parser = new XMLParser(options);
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