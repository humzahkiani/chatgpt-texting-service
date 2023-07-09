import { jest } from '@jest/globals';
import { validateEventSchema, validateEventBodySchema } from '../../../../src/services/validation/schemaValidationService.js';
import { createMockValidEvent, createMockValidEventBody } from '../../../resources/test-utils.js'; 


const removeFieldFromObject = (field,object) => {
    const { [field]: value, ...newObject } = object;
    return newObject
};

describe('schemaValidationService.js', () => {

    describe('validateEventSchema', () => {

        describe('When it validates a correct event object', () => {
            it('Then it returns True', () => {
                const mockValidEvent = createMockValidEvent();
                expect(validateEventSchema(mockValidEvent)).toEqual(true);
            })
        })

        describe('When it validates an event object that is missing any required field', () => {
            const mockValidEvent = createMockValidEvent();
            for (let field in mockValidEvent) {
                const eventWithMissingField = removeFieldFromObject(field,mockValidEvent)

                it('Then it returns False', () => {
                    expect(validateEventSchema(eventWithMissingField)).toEqual(false);
                })
            }
        })

        describe('When it validates an event object that has a field with the wrong type', () => {
            const mockValidEventWithWrongTypeField = {...createMockValidEvent()};
            mockValidEventWithWrongTypeField.routeKey = 123;
            it('Then it returns False', () => {
                expect(validateEventSchema(mockValidEventWithWrongTypeField)).toEqual(false);
            })
        })
    })

    describe('validateEventBodySchema', () => {

        describe('When it validates a correct event body object', () => {
            it('Then it returns True', () => {
                const mockValidEventBody = createMockValidEventBody();
                expect(validateEventBodySchema(mockValidEventBody)).toEqual(true);
            })
        })

        describe('When it validates an event body object that is missing any required field', () => {
            const mockValidEventBody = createMockValidEventBody();
            for (let field in mockValidEventBody) {
                const eventBodyWithMissingField = removeFieldFromObject(field,mockValidEventBody)

                it('Then it returns False', () => {
                    expect(validateEventBodySchema(eventBodyWithMissingField)).toEqual(false);
                })
            }
        })

        describe('When it validates an event body object that has a field with the wrong type', () => {
            const mockValidEventBodyWithWrongTypeField = {...createMockValidEventBody()};
            mockValidEventBodyWithWrongTypeField.ToCountry = 123;
            it('Then it returns False', () => {
                expect(validateEventBodySchema(mockValidEventBodyWithWrongTypeField)).toEqual(false);
            })
        })
    })
        
})