"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionaries_1 = require("@/app/i18n/dictionaries");
const settings_1 = require("@/app/i18n/settings");
const Header_1 = __importDefault(require("@/objectForm/Header"));
const prisma_1 = __importDefault(require("@/services/prisma"));
const util_1 = require("@/services/util");
const navigation_1 = require("next/navigation");
const calculator_1 = require("./calculator");
const helpers_1 = require("./helpers");
const ProductForm_1 = __importDefault(require("./ProductForm"));
function Page({ params }) {
    return __awaiter(this, void 0, void 0, function* () {
        const isNewObject = params.id === 'new';
        let object;
        if (!isNewObject) {
            try {
                object = yield (0, helpers_1.getObject)(Number(params.id));
                object = (0, util_1.makeSerializable)(object);
            }
            catch (e) {
                (0, navigation_1.notFound)();
            }
        }
        const productTypes = yield prisma_1.default.productType.findMany({
            select: {
                id: true,
                name: true
            }
        });
        const lng = String(params.lng) || settings_1.fallbackLng;
        const dict = yield (0, dictionaries_1.getDictionary)(lng);
        return <>
		<Header_1.default {...{ isNewObject, params, object, dict, name: dict.productSingular }}/>
		<ProductForm_1.default {...{
            lng,
            isNewObject,
            params,
            initialValues: (0, calculator_1.getInitialValues)({ object }),
            save: dict.save,
            message: dict.successfully,
            errorMessages: dict.errorMessages,
            productTypes,
            labels: dict.product,
        }}/>
	</>;
    });
}
exports.default = Page;
