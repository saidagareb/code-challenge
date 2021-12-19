const Texte = require('../models/texte.model');

//Create a text
exports.texte_create = async function (req, res) {
    let texte = new Texte(
        {
            frenchtext: req.body.frenchtext,
            arabictext: req.body.arabictext,
            englishtext: req.body.englishtext,
        }
    );
    await texte.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(texte)
    })
};

/***************************************************************************************/

// Show text by ID
exports.texte_details = function (req, res) {
    Texte.findById(req.params.id, function (err, texte) {
        if (err) return next(err);
        res.json(Texte);
    })
};

/******************************************************************************************/
// Update a text by Id
exports.texte_update = function (req, res) {
    Texte.findByIdAndUpdate(req.params.id, { $set: req.body },
        function (err, texte) {
            if (err) return next(err);
            res.send('Texte is updated.');
        });
};
/***************************************************************************************/
// Delete text by Id 
exports.texte_delete = function (req, res) {
    Texte.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted Texte ' + req.params.id + 'succesfully')
    })
};
/****************************************************************************************/
// Fetch with pagination
exports.texte_get_with_pagination = async function (req, res) {

    try {
        // Adding Pagination limit and skip
        const limitValue = req.query.limit || 2;
        const skipValue = req.query.skip || 0;
        const texts = await Texte.find()
            .limit(limitValue).skip(skipValue);
        res.status(200).send(texts);
    } catch (e) {
        console.log(e);
    }
};
/************************************************************************************/
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
exports.texte_fetch_fuzzy = async function (req, res) {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Texte.find({ "frenchtext": regex }, function (err, foundTexte) {
            if (err) {
                console.log(err);
            } else {
                res.render("texts/index", { texts: foundTexte });
            }
        });
    }
};
/************************************************************************************/


