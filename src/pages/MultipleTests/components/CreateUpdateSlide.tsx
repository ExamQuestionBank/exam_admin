import React, {useState} from 'react'
import {Drawer, Form, Input,Button,Select,message} from 'antd'
import { TableListItem } from '../data.d';
import { saveOrUpdateMultipleTest } from '../service';


export interface FormValueType extends Partial<TableListItem> {
  checked?: number,
  section?: string,
  subject?: string,
  testFrom?: string,
  testYear?: string,
  question?: string,
  answerA?: string,
  answerB?: string,
  answerC?: string,
  answerD?: string,
  answer?: string,
  answerAnalysis?: string,
}

export interface CreateUpdateSlideProps {
  visible: boolean;
  onClose: (update:boolean) => void;
  record: Partial<TableListItem>;
}

export interface CreateUpdateSlideState {
  formVals: FormValueType;
}





const FormItem = Form.Item;
const { TextArea } = Input;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateUpdateSlide: React.FC<CreateUpdateSlideProps> = (props) => {
  
  const [formVals] = useState<FormValueType>({
    section: props.record.section,
    subject: props.record.subject,
    testFrom:  props.record.testFrom,
    testYear: props.record.testYear,
    question: props.record.question,
    answerA: props.record.answerA,
    answerB: props.record.answerB,
    answerC: props.record.answerC,
    answerD: props.record.answerD,
    answer: props.record.answer,
    answerAnalysis: props.record.answerAnalysis ? props.record.answerAnalysis : '',
    checked:props.record.checked ? props.record.checked : 0,
  });
  const {
    visible,
    onClose,
  } = props;
  const [form] = Form.useForm();

  const onCanle = () => onClose(false)

  const onConfrim = async () => {
    // onClose()
    const fieldsValue = await form.validateFields();
    fieldsValue.checked = Number(fieldsValue.checked.value)
    const saveData = {
      ...props.record,
      ...fieldsValue,
      testNo:props.record.id,
    }
    try {
      const res = await saveOrUpdateMultipleTest(saveData)
      if (res && !res.errors) {
        onClose(true)
      } else {
        // console.log(JSON.parse(res.errors))
        message.error(res.name);
      }
    } catch (err) {
      message.error(err);
    }

  }

  const renderContent = () => {
    return (
      <>
        <FormItem name="testYear" label="试题年份" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="section" label="试题板块" rules={[{ required: true, message: '请选择' }]}>
          <Select>
              <Select.Option value="现代汉语">现代汉语</Select.Option>
              <Select.Option value="教育学引论">教育学引论</Select.Option>
              <Select.Option value="古代汉语">古代汉语</Select.Option>
              <Select.Option value="案例分析">案例分析</Select.Option>
              <Select.Option value="跨文化交际">跨文化交际</Select.Option>
              <Select.Option value="中外文化">中外文化</Select.Option>
            </Select>
        </FormItem>
        <FormItem name="subject" label="科目" rules={[{ required: true, message: '请选择' }]}>
          <Select>
            <Select.Option value="445汉语国际教育基础">445汉语国际教育基础</Select.Option>
            <Select.Option value="354汉语基础">354汉语基础</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="testFrom" label="试题出处" rules={[{ required: true, message: '请输入' }]}>
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="question" label="题目" rules={[{ required: true, message: '请输入' }]}>
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerA" label="A" rules={[{ required: true, message: '请输入' }]}>
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerB" label="B" rules={[{ required: true, message: '请输入' }]}>
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerC" label="C" rules={[{ required: true, message: '请输入' }]}>
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answerD" label="D" rules={[{ required: true, message: '请输入' }]}>
          <TextArea  placeholder="请输入" />
        </FormItem>
        <FormItem name="answer" label="答案" rules={[{ required: true, message: '请输入' }]}>
          <Input  placeholder="请输入A,B,C,D" />
        </FormItem>
        <FormItem name="answerAnalysis" label="解析">
          <TextArea  placeholder="请输入答案解析" />
        </FormItem>
        <FormItem name="checked" label="校对状态">
          < Select labelInValue>
            <Select.Option value="1">通过</Select.Option>
            <Select.Option value="0">待定</Select.Option>
          </Select>
        </FormItem>
      </>
    )
  }


  const renderFooter = () => {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Button onClick={onCanle} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={onConfrim} type="primary">
          确定
        </Button>
      </div>
    )
  }

  return (
    <Drawer
        title="编辑题目"
        placement="right"
        width="600"
        closable={false}
        onClose={() => {onClose(false)}}
        visible={visible}
        footer={renderFooter()}
      >
        <Form
          {...formLayout}
          form={form}
          initialValues={{
            section: formVals.section,
            subject: formVals.subject,
            testYear: formVals.testYear,
            testFrom: formVals.testFrom,
            question: formVals.question,
            answerA: formVals.answerA,
            answerB: formVals.answerB,
            answerC: formVals.answerC,
            answerD: formVals.answerD,
            answer: formVals.answer,
            answerAnalysis: formVals.answerAnalysis ? formVals.answerAnalysis : '',
            checked:formVals.checked ? {value: 1, label: '通过'} : {value: 0, label: '待定'}
          }}
      >
        {renderContent()}
      </Form>
      </Drawer>
  )
}

export default CreateUpdateSlide;