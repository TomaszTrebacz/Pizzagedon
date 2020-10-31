import { DataTypes, Model } from 'sequelize';

import sequelize from './connection';

export class User extends Model {}
User.init(
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			allowNull: false,
			type: DataTypes.CHAR(64),
		},
		role: {
			defaultValue: 'user',
			type: DataTypes.ENUM('root', 'admin', 'worker', 'deliverer', 'writer', 'user'),
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		surname: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		street: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		postCode: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		city: {
			allowNull: true,
			type: DataTypes.STRING,
		},
		phoneNumber: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},
	},
	{
		defaultScope: {
			rawAttributes: { exclude: ['password'] },
		},
		modelName: 'users',
		sequelize,
	}
);
