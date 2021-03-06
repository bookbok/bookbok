import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as ResourceTypes from '../../resource-types';
import { store } from '../../store';
import { fetchBokFlow } from '../../actions';
import { isEmpty, getAuthUser } from '../../utils';

import { Loading } from '../shared/Loading';
import BokFlowContent from './BokFlowContent';

interface Props {
    history: ResourceTypes.Route;
    bokFlow?: Array<ResourceTypes.Bok>;
}

class BokFlow extends React.Component<Props> {
    componentDidMount() {
        if (!getAuthUser()) {
            return this.props.history.push('/login');
        }
        store.dispatch(fetchBokFlow());
    }

    render() {
        if (isEmpty(this.props.bokFlow)) {
            return <Loading />;
        }

        const currentUser = getAuthUser();
        return <BokFlowContent currentUser={currentUser} bokFlow={this.props.bokFlow} />;
    }
}

export default withRouter(connect(state => state)(BokFlow));
