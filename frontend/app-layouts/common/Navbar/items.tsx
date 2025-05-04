import type { MenuMixedOption } from "naive-ui/es/menu/src/interface"
import { renderIcon } from "@/utils"
import { h } from "vue"
import { RouterLink } from "vue-router"

const BlankIcon = "carbon:document-blank"

// eslint-disable-next-line unused-imports/no-unused-vars
export default function getItems(args: { mode: "vertical" | "horizontal"; collapsed: boolean }): MenuMixedOption[] {
	return [
		{
			label: () =>
				h(
					RouterLink,
					{
						to: {
							name: "BlankPage"
						}
					},
					{ default: () => "Blank Page" }
				),
			key: "BlankPage",
			icon: renderIcon(BlankIcon)
		}
	]
}
