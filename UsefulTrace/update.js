const dbConnect = require('./mongodb');

const update = async () => {
    let data = await dbConnect();
    let result = await data.updateOne(
        {name:'note 5'},{
            $set: {name: 'note max pro 5'}
        }
    );
    console.warn(result);
}

update();