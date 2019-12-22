const app = new App('#app');
const api = new API();

app.addComponent({
    name: 'dogs',
    model: {
        dogs: []
    },
    view(model) {
        return `There are ${model.dogs.length} dogs`
    },
    controller(model) {
        api.getDogs()
        .then(result => {
            console.log(result)
            model.dogs = result.dogs
        })
    }
})

const router = new Router(app);
router.addRoute('dogs', '^#/dogs$')