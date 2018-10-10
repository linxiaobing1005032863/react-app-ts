import * as React from 'react';
import moment from 'moment';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button } from 'antd';

import TagSelect from '../../components/TagSelect';
import StandardFormRow from '../../components/StandardFormRow';
import './Articles.less';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

// @connect(({ list, loading }) => ({
//     list,
//     loading: loading.models.list,
// }))
class SearchList extends React.Component<{form, list, loading: boolean}> {
    public componentDidMount() {
        this.fetchMore();
    }

    private setOwner = () => {
        const { form } = this.props;
        form.setFieldsValue({
            owner: ['wzj'],
        });
    };

    private fetchMore = () => {
        // this.props.dispatch({
        //     type: 'list/appendFetch',
        //     payload: {
        //         count: pageSize,
        //     },
        // });
    };

    private handleFormSubmit = (key)=> {
        console.debug(key);
    }

    public render() {
        const { form, list=[], loading } = this.props;
        const { getFieldDecorator } = form;

        const owners = [
            {
                id: 'wzj',
                name: '我自己',
            },
            {
                id: 'wjh',
                name: '吴家豪',
            },
            {
                id: 'zxx',
                name: '周星星',
            },
            {
                id: 'zly',
                name: '赵丽颖',
            },
            {
                id: 'ym',
                name: '姚明',
            },
        ];

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
            <div className={'listContent'}>
                <div className={'description'}>{content}</div>
                <div className={'extra'}>
                    <Avatar src={avatar} size="small" />
                    <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
                    <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
                </div>
            </div>
        );

        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 12 },
            },
        };

        const loadMore =
            list.length > 0 ? (
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
                        {loading ? (
                            <span>
                                <Icon type="loading" /> 加载中...
                            </span>
                            ) : (
                                '加载更多'
                            )}
                    </Button>
                </div>
            ) : null;

        return (
            <React.Fragment>
                <Card bordered={false}>
                    <Form layout="inline">
                        <StandardFormRow title="所属类目" block={true} style={{ paddingBottom: 11 }}>
                            <FormItem>
                                {getFieldDecorator('category')(
                                    <TagSelect onChange={this.handleFormSubmit} expandable={true}>
                                        <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                                        <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                                        <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                                        <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                                        <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                                        <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                                        <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                                        <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                                        <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                                        <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                                        <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                                        <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
                                    </TagSelect>
                                )}
                            </FormItem>
                        </StandardFormRow>
                        <StandardFormRow title="owner" grid={true}>
                            <Row>
                                <Col lg={16} md={24} sm={24} xs={24}>
                                    <FormItem>
                                        {getFieldDecorator('owner', {
                                            initialValue: ['wjh', 'zxx'],
                                        })(
                                            <Select
                                                mode="multiple"
                                                style={{ maxWidth: 286, width: '100%' }}
                                                placeholder="选择 owner"
                                            >
                                                {owners.map(owner => (
                                                    <Option key={owner.id} value={owner.id}>
                                                        {owner.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        )}
                                        <a className={'selfTrigger'} onClick={this.setOwner}>
                                            只看自己的
                                        </a>
                                    </FormItem>
                                </Col>
                            </Row>
                        </StandardFormRow>
                        <StandardFormRow title="其它选项" grid={true} last={true}>
                            <Row gutter={16}>
                                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                    <FormItem {...formItemLayout} label="活跃用户">
                                        {getFieldDecorator('user', {})(
                                            <Select
                                                onChange={this.handleFormSubmit}
                                                placeholder="不限"
                                                style={{ maxWidth: 200, width: '100%' }}
                                            >
                                                <Option value="lisa">李三</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                    <FormItem {...formItemLayout} label="好评度">
                                        {getFieldDecorator('rate', {})(
                                            <Select
                                                onChange={this.handleFormSubmit}
                                                placeholder="不限"
                                                style={{ maxWidth: 200, width: '100%' }}
                                            >
                                                <Option value="good">优秀</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </StandardFormRow>
                    </Form>
                </Card>
                <Card
                    style={{ marginTop: 24 }}
                    bordered={false}
                    bodyStyle={{ padding: '8px 32px 32px 32px' }}
                >
                    <List
                        size="large"
                        loading={list.length === 0 ? loading : false}
                        rowKey="id"
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <IconText key={0} type="star-o" text={item.star} />,
                                    <IconText key={1} type="like-o" text={item.like} />,
                                    <IconText key={2} type="message" text={item.message} />,
                                ]}
                                extra={<div className={'listItemExtra'} />}
                            >
                                <List.Item.Meta
                                    title={
                                        <a className={'listItemMetaTitle'} href={item.href}>
                                            {item.title}
                                        </a>
                                    }
                                    description={
                                        <span>
                                            <Tag>Ant Design</Tag>
                                            <Tag>设计语言</Tag>
                                            <Tag>蚂蚁金服</Tag>
                                        </span>
                                    }
                                />
                                <ListContent data={item} />
                            </List.Item>
                        )}
                    />
                </Card>
            </React.Fragment>
        );
    }
}

export default Form.create()(SearchList);