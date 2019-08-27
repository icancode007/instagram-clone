import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from '../SignIn';
import jest from 'jest';
import { shallow } from 'enzyme';

const Mocks = {
    toggleUserForm: jest.fn()
}

describe("Checks if the sate is being set correctly", () => {

    beforeAll(() => {
        const wrapper = shallow(<SignIn toggleUserForm={Mocks.toggleUserForm} />);
    })

    it('handleUserNameChange', () => {
        // do something

    });

    it('handlePasswordChange', () => {
        // do something

    });

    it(' togglePassword', () => {
        // do something

    });

    it(' togglePassword', () => {
        // do something

    });
});
