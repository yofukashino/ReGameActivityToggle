import { common, components } from "replugged";
import { KeybindRecorder } from "../lib/requiredModules";
import * as Utils from "../lib/utils";
const { React } = common;
const { FormItem } = components;

class CloseButtonWithProps extends React.Component {
  props: {
    size?: string;
    className?: string;
    onClick?: () => void;
  };
}

class CloseButton extends CloseButtonWithProps {
  render() {
    const size = this.props.size || "16px";
    return React.createElement(
      "svg",
      {
        className: this.props.className || "",
        fill: "currentColor",
        viewBox: "0 0 24 24",
        style: { width: size, height: size },
        onClick: this.props.onClick,
      },
      React.createElement("path", {
        d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z",
      }),
    );
  }
}
interface KeybindRecorderItemProps {
  title?: string;
  note?: string;
  size?: string;
  className?: string;
  value?: boolean | string | unknown[];
  onChange?: (value: boolean | string | unknown[]) => void;
  disabled?: boolean;
  clearable?: boolean;
}
class KeybindRecorderItemWithProps extends React.Component {
  props: KeybindRecorderItemProps;
  state: {
    value: boolean | string | unknown[];
  };
}
export class KeybindRecorderItem extends KeybindRecorderItemWithProps {
  constructor(props: KeybindRecorderItemProps) {
    super(props);
    props.clearable = Utils.hasProps(props, ["clearable"]) ? true : props.clearable;
    this.state = { value: props.value };
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.setState({ value: [] });
    this.props.onChange([]);
  }

  render() {
    return (
      <FormItem
        title={this.props.title}
        style={{ marginBottom: 20 }}
        note={this.props.note}
        notePosition="after"
        divider>
        <div
          {...{
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}>
          <div
            {...{
              style: {
                flexGrow: 1,
              },
            }}>
            <KeybindRecorder
              {...{
                disabled: this.props.disabled,
                defaultValue: this.state.value,
                onChange: (value: boolean | string | unknown[]) => {
                  this.setState({ value });
                  this.props.onChange(value);
                },
              }}
            />
          </div>
          {this.props.clearable && (
            <div
              {...{
                style: {
                  marginLeft: "5px",
                  color: "var(--interactive-normal)",
                  cursor: "pointer",
                },
              }}>
              <CloseButton
                {...{
                  onClick: this.clear,
                }}
              />
            </div>
          )}
        </div>
      </FormItem>
    );
  }
}
