import type { MenuMixedOption } from "naive-ui/es/menu/src/interface"
import { renderIcon } from "@/utils"
import { h } from "vue"
import { RouterLink } from "vue-router"

const HomeIcon = "carbon:home"
const AgentsIcon = "carbon:user-multiple"
const VulnerabilitiesIcon = "carbon:security" // Using a security icon for vulnerabilities

export default function getItems(args: { mode: "vertical" | "horizontal"; collapsed: boolean }): MenuMixedOption[] {
    return [
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "HomePage"
                        }
                    },
                    { default: () => "Home" }
                ),
            key: "HomePage",
            icon: renderIcon(HomeIcon)
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "AgentsPage"
                        }
                    },
                    { default: () => "Agents" }
                ),
            key: "AgentsPage",
            icon: renderIcon(AgentsIcon)
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: "Vulnerabilities"
                        }
                    },
                    { default: () => "Vulnerabilities" }
                ),
            key: "Vulnerabilities",
            icon: renderIcon(VulnerabilitiesIcon)
        }
    ]
}