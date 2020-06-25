const Firestore = require('@google-cloud/firestore');
const projectId = 'firestore-form-emerhub';
const collectionName = 'form';

const firestore = new Firestore({
    projectId
});

exports.form_status = (req, res) => {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET')
    return firestore.collection(collectionName)
        .doc('form')
        .get()
        .then(doc => {
            if (!(doc && doc.exists)) {
                return res.status(404).send({
                    error: 'Document not found'
                });
            }

            let data = doc.data();
            data = Object.values(data);

            const percentage = data.filter(String).length * 20;

            return res.status(200).send({
                percentage
            });
        })
        .catch(error => {
            return res.status(500).send({
                error
            });
        });
};