import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends PureComponent {
    render() {
        return (
            <div>
                
                <Link className="btn btn-primary" to="/init">
                    Init
                </Link>
                <Link className="btn btn-secondary" to="/new-item">
                    + Add New
                </Link>
            </div>
        )
    }
}

export default Navigation
