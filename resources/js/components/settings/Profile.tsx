import * as React from 'react';
import * as ResourceTypes from '../../resource-types';
import { store } from '../../store';
import { requestUpdateUser, setLoggedinUser, setAlertMessage } from '../../actions';
import * as utils from '../../utils';
import SettingsSubContent from './SettingsSubContent';

interface Props {
    history: ResourceTypes.Route;
}

class Profile extends React.Component<Props, any> {
    constructor(props) {
        super(props);

        this.state = {
            name: { value: '', invalidMessage: '', isInvalid: false },
            avatar: { value: '', invalidMessage: '', isInvalid: false },
            description: { value: '', invalidMessage: '', isInvalid: false },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserFromState = this.getUserFromState.bind(this);
        this.initErrOfForm = this.initErrOfForm.bind(this);
    }

    componentDidMount() {
        const loginUser = utils.getAuthUser();
        if (!loginUser) {
            return this.props.history.push('/login');
        }

        this.setState({
            name: { ...this.state.name, value: loginUser.name },
            avatar: { ...this.state.avatar, value: loginUser.avatar },
            description: { ...this.state.description, value: loginUser.description },
        });
    }

    initErrOfForm() {
        this.setState({
            name: { ...this.state.name, invalidMessage: '', isInvalid: false },
            avatar: { ...this.state.avatar, invalidMessage: '', isInvalid: false },
            description: { ...this.state.description, invalidMessage: '', isInvalid: false },
        });
    }

    getUserFromState() {
        const state = this.state;
        return {
            name: state.name.value,
            avatar: state.avatar.value,
            description: state.description.value,
        };
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(state => {
            return {
                [name]: {
                    ...state[name],
                    value: value,
                },
            };
        });
    }

    handleSubmit() {
        requestUpdateUser(this.getUserFromState())
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 400) {
                    res.json().then(json => {
                        const userMessage = json.userMessage;
                        if (userMessage.name != null) {
                            this.setState({
                                name: {
                                    ...this.state.name,
                                    invalidMessage: userMessage.name,
                                    isInvalid: true,
                                },
                            });
                        }
                        if (userMessage.avatar != null) {
                            this.setState({
                                avatar: {
                                    ...this.state.avatar,
                                    invalidMessage: userMessage.avatar,
                                    isInvalid: true,
                                },
                            });
                        }
                        if (userMessage.description != null) {
                            this.setState({
                                description: {
                                    ...this.state.description,
                                    invalidMessage: userMessage.description,
                                    isInvalid: true,
                                },
                            });
                        }
                    });
                }
                throw new Error();
            })
            .then(json => {
                // ?????????????????????????????????store????????????????????????????????????
                store.dispatch(setLoggedinUser(json));
                store.dispatch(setAlertMessage('success', { __html: '??????????????????' }));
                this.initErrOfForm();
            })
            .catch(() => {});
    }

    render() {
        return (
            <div className="page-content-wrap row">
                <SettingsSubContent />

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="main-content">
                            <div className="user-detail-wrapper d-flex flex-column">
                                <h1>????????????????????????</h1>

                                {/* ?????????????????? */}
                                <div className="items-wrapper">
                                    <div className="d-flex align-items-end">
                                        <label className="font-weight-bold">??????????????????</label>
                                        <p className="text-muted hint-message">
                                            32???????????????????????????????????????????????????
                                        </p>
                                    </div>
                                    <input
                                        name="name"
                                        type="text"
                                        className={`form-control ${this.state.name.isInvalid &&
                                            'is-invalid'}`}
                                        value={this.state.name.value}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.state.name.invalidMessage}
                                    </div>
                                </div>

                                {/* ???????????????????????? */}
                                <div className="items-wrapper">
                                    <div className="d-flex align-items-end">
                                        <label className="font-weight-bold">????????????????????????</label>
                                    </div>
                                    <img
                                        src={this.state.avatar.value}
                                        className="user-info-avatar d-block mb-1"
                                    />
                                    <input
                                        name="avatar"
                                        type="text"
                                        className={`form-control ${this.state.avatar.isInvalid &&
                                            'is-invalid'}`}
                                        placeholder="??????https://example.com/sample.png"
                                        value={this.state.avatar.value}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.state.avatar.invalidMessage}
                                    </div>
                                </div>

                                {/* ??????????????? */}
                                <div className="items-wrapper">
                                    <div className="d-flex align-items-end">
                                        <label className="font-weight-bold">????????????</label>
                                        <p className="text-muted hint-message">
                                            1000???????????????????????????????????????
                                        </p>
                                    </div>
                                    <textarea
                                        name="description"
                                        className={`form-control description-input ${this.state
                                            .description.isInvalid && 'is-invalid'}`}
                                        placeholder="???????????????????????????????????????????????????????????????????????????"
                                        value={this.state.description.value}
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.state.description.invalidMessage}
                                    </div>
                                </div>

                                <button
                                    className="btn btn-success float-right"
                                    onClick={this.handleSubmit}
                                >
                                    ??????
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import { connect } from 'react-redux';

export default connect(state => state)(Profile);
