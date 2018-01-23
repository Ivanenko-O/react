import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import {fromTo } from 'gsap';


// Instruments
import { createPost } from '../../helpers/fetch'
import Styles from './styles';
import Catcher from '../../components/Catcher';
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Postman from '../../components/Postman';



export default class Feed extends Component {
    // потребитель
    static contextTypes = {
        api:    PropTypes.string.isRequired,
        token: PropTypes.string.isRequired
    }

    state = {
        posts: [],
        spin: false,
        postman: true
    }

    constructor() {
        super();

        this.createPost = :: this._createPost;
        this.getPosts = :: this._getPosts;
        this.deletePosts = :: this._deletePosts;
        this.startFetching = ::this._startFetching;
        this.stopFetching = ::this._stopFetching;
        this.handleComposerAppear = ::this._handleComposerAppear;
        this.handleCounterAppear = ::this._handleCounterAppear;
        this.handlePostmanAppear = :: this._handlePostmanAppear;
        this.handlePostmanDisapear = :: this._handlePostmanDisapear;
    }

    async componentDidMount () {
        await this.getPosts();
    }
    async componentWillUmount () {
        clearInterval(this.interval);
    }

    interval = setInterval(() => this.getPosts(), 1000);

    _startFetching () {
        this.setState(()=> ({
            spin: true
        }));
    }

    _stopFetching (s) {
        this.setState(()=> ({
            spin: false
        }));
    }

    _createPost (comment){
        const { api, token } = this.context;


        console.log(data);



        this.startFetching();
        try {
            const data = await createPost(comment, {api, token});

        //     fetch(api, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': token
        //         },
        //         body: JSON.stringify({
        //             comment
        //         })
        //     })
        //     .then((response) => response.json())
        //     .then(({ data}) => {
        //         this.setState(({ posts} ) => ({
        //             posts: [data, ...posts],
        //         }))
        // })
        } catch ({ message }) {
            console.log(message);
        } finally {
            this.stopFetching();
        }
    }

    async _deletePosts(id) {
        const { api, token } = this.context;
        const apiId =  `${api}/${id}`;

        this.startFetching();
        try {
            const response = await fetch(apiId, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                }
            });

            if (response.status !== 204) {
                throw new Error('post delete failed');
            }

            this.setState((({posts}) => ({
                posts: posts.filter((post) => id !== post.id),
            })));

        } catch ({ message }) {
            console.log(message);
        }

        this.stopFetching();
    }

    async _getPosts () {
        const { api } = this.context;

        this.startFetching();
        try {
            const response = await fetch(`${api}?size=30&page1`);

            if( response.status !== 200 ) {
                throw new Error('posts fetch failed');
            }

            const { data: posts, meta } = await response.json();

            this.setState({
                posts
            })
        } catch ({ message }) {
            console.log(message);
        }
        this.stopFetching();
    }

    _handleComposerAppear(composer) {
        fromTo(
            composer,
            1,
            {
                y:          -200,
                x:          500,
                opacity:    0,
                rotationY:  360
            },
            {
                y:          0,
                x:          0,
                opacity:    1,
                rotationY:  0
            }
        )
    }

    _handleCounterAppear(counter) {
        fromTo(
            counter,
            1,
            {
                y:          -1000,
                x:          -300,
                opacity:    0,
                rotationY:  360
            },
            {
                y:          0,
                x:          0,
                opacity:    1,
                rotationY:  0
            }
        )
    }

    _handlePostmanAppear(postman) {
        fromTo(
            postman,
            2,
            {
                x:          500,
                opacity:    0
            },
            {
                x:          0,
                opacity:    1,
                onComplete: () => {
                    // setTimeout(() => this.setState({
                    //     postman: false
                    // }), 5000)

                    this.setState({
                        postman: false
                    })
                }
            }
        )
    }

    _handlePostmanDisapear(postman) {
        fromTo(
            postman,
            2,
            {
                x:          0,
                opacity:    1
            },
            {
                x:          500,
                opacity:    0,
                delay:      3
            }
        )
    }



    render () {
        const { posts: postsData, spin } = this.state;
        const lengthPost = postsData.length ? postsData.length : 0;

        const posts = postsData.map((posts) =>

             (<CSSTransition
                classNames = {{
                    enter:          Styles.postInStart,
                    enterActive:    Styles.postInEnd,
                    exit:           Styles.postOutStart,
                    exitActive:     Styles.postOutEnd
                }}
                key = { posts.id }
                timeout = {{ enter: 700, exit: 600 }}>
                <Catcher>
                    <Post { ...posts }
                          deletePosts = { this.deletePosts }
                    />
                </Catcher>
             </CSSTransition>)
        );

        {/* передаем ссылку на криэйт пост и вызываем ее в компоузер */}
        return (
            <section className = { Styles.app }>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleComposerAppear }>
                    <Composer
                        createPost = { this.createPost }
                    />
                </Transition>

                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleCounterAppear }>
                    <Counter lengthPost = { lengthPost }/>
                </Transition>
                <Spinner spin = { spin } />

                <TransitionGroup>
                    { posts }
                </TransitionGroup>

                <Transition
                    appear
                    in      =   { this.state.postman }
                    timeout =   { 1000 }
                    onEnter =   { this.handlePostmanAppear }
                    onExit  =   { this.handlePostmanDisapear }>
                    <Postman/>
                </Transition>
            </section>
        );
    }
}
