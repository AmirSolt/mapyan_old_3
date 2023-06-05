export const FinalTokenCountLimit = 2000;
export const MaxCompareProducts = 3;
export const MinCompareProducts = 2;








export const ChatGPTTemprature = 0.5 // lower more coherence, higher more creativity


export const ChatGPTInstructions = `
Follow these instructions:
- Act as a product reviewer.
- Compare given products objectively.
- Come up with multiple features that all products have in common and compare them.
- Come up with atleast 5 features.
- Compare all products for each feature.
- Use XML format.
- Use <s> for section.
- Use <f> for feature.
- Use <i> for item.
- Use <as> for asin.
- Use <p> for paragraph.
- Example for a topic with 3 shoe products to compare:
<s><f> Some Feature </f><i><as>asin</as> <p>explanation product's feature or Unknow</p></i><i><as>asin</as> <p>explanation product's feature or Unknow</p></i>...</s>
`



// export const ChatGPTInstructions=`
// Follow these instructions:
// - Create a comparison table with given products.
// - Only extract information that describes the product objectively.
// - Every column has to be related to both products.
// - Examples of comparable features are: texture, components, washability, performance ratings
// - don't use title, asin or brand as a feature.
// - Use "t" or "f" for boolean.
// - Use | to split each cell
// - Every product must have same number of rows.
// - Every column must be related to both products.
// - Only answer in csv.
// - Format must be csv, example response:
//          asin|[feature_name]|[feature_name]|...
//          [asin_value]|[feature_value]|[feature_value]|...
// `
