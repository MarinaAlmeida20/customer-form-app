"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientResolver = void 0;
const type_graphql_1 = require("type-graphql");
const ClientInputs_1 = require("../Inputs/ClientInputs");
const Client_1 = require("../Models/Client");
const Client_2 = require("../mongodb/Models/Client");
let ClientResolver = class ClientResolver {
    // Get all clients
    async clients() {
        return await Client_2.ClientMongo.find();
    }
    // Get one client
    async client(id) {
        // If _id === id return client
        return await Client_2.ClientMongo.findOne({ _id: id });
    }
    // Create client
    async createClient(createClientObject) {
        const { firstName, surname, email, country } = createClientObject;
        return await Client_2.ClientMongo.create({
            firstName,
            surname,
            email,
            country,
        });
    }
    // Edit Client
    async editClient(editClientObject) {
        const client = { ...editClientObject };
        // If the _id === client.id, return client edited
        await Client_2.ClientMongo.updateOne({ _id: client.id }, client);
        return client;
    }
    // Delete Client
    async deleteClient(id) {
        await Client_2.ClientMongo.deleteOne({ _id: id });
        return `Client id:${id} deleted`;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Client_1.Client]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "clients", null);
__decorate([
    (0, type_graphql_1.Query)(() => Client_1.Client),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "client", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Client_1.Client),
    __param(0, (0, type_graphql_1.Arg)("createClientObject")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientInputs_1.CreateClientInput]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "createClient", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Client_1.Client),
    __param(0, (0, type_graphql_1.Arg)("editClientObject")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClientInputs_1.EditClientInput]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "editClient", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "deleteClient", null);
ClientResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ClientResolver);
exports.ClientResolver = ClientResolver;
