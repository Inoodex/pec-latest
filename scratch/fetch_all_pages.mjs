const urls = [
  "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-1",
  "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-2",
  "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-3",
  "https://www.apps.peceduglobal.com/api/public/pages/promotional-page-4"
];

Promise.all(urls.map(url => fetch(url).then(r => r.json()))).then(results => {
  results.forEach((res, i) => {
    console.log(`=== Page ${i+1} ===`);
    res.data?.blocks?.forEach(b => {
      console.log(`[Block: ${b.block_type}] Title: ${b.section_title}`);
      if (b.section_description) console.log(`Desc: ${b.section_description}`);
      b.elements?.forEach(el => {
        console.log(`  - Element Title: ${el.element_title}`);
        if (el.element_body) console.log(`    Body: ${el.element_body}`);
      });
    });
  });
});
