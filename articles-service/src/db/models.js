import { DataTypes, Model } from 'sequelize';

import sequelize from './connection';

export class Article extends Model {}
Article.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER.UNSIGNED,
		},
		title: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		content: {
			allowNull: false,
			type: DataTypes.TEXT,
		},
	},
	{ sequelize, modelName: 'articles' }
);
