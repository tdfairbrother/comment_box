/**  React.DOM */

var React = require('react'),
    Firebase = require('firebase');
    ReactFireMixin = require('reactfire');

/**  React.DOM */
var CommentList = React.createClass({displayName: 'CommentList',
    render: function() {
        var createItem = function(item, index) {
            return React.DOM.li({key: index },  item.text);
        };
        return React.DOM.ul(null,  this.props.items.map(createItem) );
    }
});

var CommentBox = React.createClass({displayName: 'CommentBox',
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
            React.DOM.div(null, 
                CommentList({items:  this.state.items}), 
                React.DOM.form({onSubmit:  this.handleSubmit}, 
                    React.DOM.input({onChange:  this.onChange, value:  this.state.text}), 
                    React.DOM.button(null,  "Add #" + (this.state.items.length + 1) )
                )
            )
            );
    }
});


module.exports = CommentBox;