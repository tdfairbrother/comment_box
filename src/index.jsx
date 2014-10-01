/** @jsx React.DOM */

var React = require('react'),
    Firebase = require('firebase');
    ReactFireMixin = require('reactfire');

/** @jsx React.DOM */
var CommentList = React.createClass({
    render: function() {
        var createItem = function(item, index) {
            return <li key={ index }>{ item.text }</li>;
        };
        return <ul>{ this.props.items.map(createItem) }</ul>;
    }
});

var CommentBox = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function() {
        return {items: [], text: ""};
    },

    componentWillMount: function() {
        var firebaseRef = new Firebase(this.props.fireurl+"/items");
        this.bindAsArray(firebaseRef.limit(100), "items");
    },

    onChange: function(e) {
        this.setState({text: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.firebaseRefs["items"].push({
                text: this.state.text
            });
            this.setState({text: ""});
        }
    },

    render: function() {
        return (
            <div>
                <CommentList items={ this.state.items } />
                <form onSubmit={ this.handleSubmit }>
                    <input onChange={ this.onChange } value={ this.state.text } />
                    <button>{ "Add #" + (this.state.items.length + 1) }</button>
                </form>
            </div>
            );
    }
});


module.exports = CommentBox;