"use strict";
const {Command} = require("patron.js");
const Eris = require("eris");

module.exports = new class HelpCommand extends Command {
	constructor() {
		super({
			args: [],
			description: "Cleans the permissions set up on your server.",
			groupName: "info",
			names: ["clean"],
			preconditions: ["guild"]
		});
		this.fullDescription = "Cleans up permissions by removing redundant channel overrides and role settings.";
	}

	async run(msg) {
		const {guild} = msg.channel;
		const everyonePermisions = guild.roles.get(guild.id).permissions;
		let changed = 0;
		let unchanged = 0;
		const failedRoles = [];

		msg.channel.sendTyping();

		for (const role of guild.roles.values()) {
			// Skip the @ everyone perm, we don't touch that
			if (role.id === guild.id)
				continue;

			const rolePermissions = role.permissions.json;
			let newPermissionsNumber = role.permissions.allow;

			console.log(role.name, role.id);
			console.log("Initial permissions", newPermissionsNumber.toString(2));

			for (const permissionName of Object.keys(rolePermissions)) {
				console.log(" Permission:", permissionName);

				if (rolePermissions[permissionName] && everyonePermisions.has(permissionName)) {
					console.log("  Yes, change it");
					newPermissionsNumber &= ~Eris.Constants.Permissions[permissionName];
					console.log("  New permission number", newPermissionsNumber.toString(2));
				}
			}

			console.log(newPermissionsNumber.toString(2));

			if (newPermissionsNumber === role.permissions.allow) {
				unchanged++;
			} else {
				try {
					await role.edit({permissions: newPermissionsNumber});
					changed++;
				} catch (error) {
					failedRoles.push(role);
				}
			}
		}

		console.log("Failed roles:", failedRoles.map(role => role.name));

		let output = `Rewrote permissions for ${changed} roles, made no changes to ${unchanged}.`;

		if (failedRoles.length) {
			const rolesList = failedRoles.map(role => `\n- ${role.name}`);

			output += ` Failed to write changes to ${failedRoles.length} roles:${rolesList}`;
		}

		msg.channel.createMessage(output).catch(() => {});
	}
}();
