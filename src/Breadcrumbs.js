import React from 'react';
import { Toolbar, Button, Component } from '@extjs/ext-react';

export default function Breadcrumbs(props) {
    let { node } = props;
    const leaf = node.isLeaf();
    const items = [];

    do {
        items.unshift(
            <Button 
                text={node.get('text')} 
                key={node.get('text')}
                ui="app-breadcrumb"
                handler={navigate.bind(null, node.id)}
            />
        );
        
        if (node.parentNode) {
            items.unshift(
                <div 
                    className="x-font-icon md-icon-keyboard-arrow-right" 
                    key={node.get('text') + '>'}
                    style={{ 
                        fontSize: '30px', 
                        lineHeight: '32px', 
                        verticalAlign: 'middle', 
                        color: '#16A113'
                    }}
                />
            );
        }
    } while (node = node.parentNode)

    return (
        <Toolbar {...props}>
            {items}
        </Toolbar>
    )
}

function navigate(hash) {
    location.hash = hash;
}