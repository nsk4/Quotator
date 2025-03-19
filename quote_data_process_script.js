// This script reads the JSON file, processes the data and writes back to the JSON file.
// Data is obtained from a public Kaggle dataset: https://www.kaggle.com/datasets/akmittal/quotes-dataset/data
// Script expects quotes dataset to be in the "quotes.json" file.
// File "new_quotes.json" will contain the processed data.
// File "dump_quotes.json" will contain the quotes that were skipped.
// The script skips quotes that are non-English, have low popularity, have weird characters or have multiple categories.
// The script also fixes quotes and authors that have missing spaces after the first quotation mark.
// The script also removes the "uncategorized" category if the quote has multiple categories.
// The script also assigns a unique ID to each quote.
// Run with "node quote_data_process_script.js".

import fs from 'fs';

// Step 1: Read the JSON file
fs.readFile('quotes.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Step 2: Parse JSON data
    let jsonData = JSON.parse(data);

    let newArr = [];
    let dumpArr = [];
    let count = 1;
    let idCount = 1;

    jsonData.forEach((element) => {
        //console.log(count, jsonData.length);
        count++;

        // Skip weird quotes, non-English quotes and quotes with low popularity.
        if (
            element.Author === 'Beryl Dov' ||
            element.Quote.includes('[10w]') ||
            element.Quote.includes('[20w]') ||
            element.Quote.includes('[3w]') ||
            element.Quote.includes('\"\"') ||
            element.Quote.includes('\"') ||
            element.Quote.includes('ا') ||
            element.Popularity < 0.000574000574000574
        ) {
            dumpArr.push(element);
            return;
        }

        const regex = /[^ (]"[a-zA-Z]/g;

        let quote = element.Quote;
        const matchQuote = regex.exec(element.Quote);
        if (matchQuote) {
            quote =
                quote.substring(0, matchQuote.index + 2) +
                ' ' +
                quote.substring(matchQuote.index + 2);
            //console.log(quote, matchQuote.index);
        }

        let author = element.Author;
        const matchAuthor = regex.exec(element.Author);
        if (matchAuthor) {
            author =
                author.substring(0, matchAuthor.index + 2) +
                ' ' +
                author.substring(matchAuthor.index + 2);
            //console.log(author, matchAuthor.index);
        }

        const category = element.Category === '' ? 'uncategorized' : element.Category;

        if (newArr[quote]) {
            if (!newArr[quote].categories.includes(category)) {
                newArr[quote].categories.push(category);
            }
        } else {
            newArr[quote] = {
                id: idCount,
                text: quote,
                author: author,
                categories: [category],
                popularity: element.Popularity
            };
            idCount++;
        }

        if (newArr[element.Quote].categories.length > 1) {
            newArr[element.Quote].categories = newArr[element.Quote].categories.filter(
                (category) => category !== 'uncategorized'
            );
        }
    });

    // Step 3: Modify the data
    let newJsonData = { quotes: Object.values(newArr) };

    // Step 4: Write back to JSON file
    fs.writeFile('new_quotes.json', JSON.stringify(newJsonData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON file successfully updated!');
    });
    fs.writeFile('dump_quotes.json', JSON.stringify(dumpArr, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON file successfully updated!');
    });
});
