import { Button } from '@/components/form/button';
import { Input } from '@/components/form/input';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { i18n } from '@/configs/i18n';
import { app$, toast$ } from '@/stores';
import type { ScreenProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { observer, useObservable } from '@legendapp/state/react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import type { Contact } from 'react-native-contacts';
import Contacts from 'react-native-contacts';
import { array, object, string } from 'zod';

const DetailScreen = observer(
	({
		route: {
			params: { contact },
		},
		navigation,
	}: ScreenProps<'DetailScreen'>) => {
		const schema = object({
			displayName: string({
				required_error: i18n.t('validation.field_required', {
					field: i18n.t('common.display_name').toLocaleLowerCase(),
				}),
			}),
			phoneNumbers: array(
				object({
					label: string(),
					number: string({
						required_error: i18n.t('validation.field_required', {
							field: i18n.t('common.phone_number').toLocaleLowerCase(),
						}),
					}),
				}),
			).min(1),
		});

		const { control, handleSubmit } = useForm<Contact>({
			defaultValues: {
				...contact,
				phoneNumbers: contact?.phoneNumbers?.length
					? contact.phoneNumbers
					: [
							{
								label: 'home',
								number: undefined,
							},
						],
			},
			resolver: zodResolver(schema),
		});

		const loading$ = useObservable(false);
		const { fields, append } = useFieldArray({ control, name: 'phoneNumbers' });

		const onSubmit = async (data: Contact) => {
			try {
				loading$.set(true);

				if (contact) {
					await Contacts.updateContact({ ...contact, ...data });
				} else {
					await Contacts.addContact({ ...data, middleName: data.displayName });
				}

				toast$.show({
					subLabel: i18n.t('common.update_success'),
				});

				loading$.set(false);
			} catch (_error) {
				loading$.set(false);
			}
		};

		return (
			<Screen loading={loading$.get()}>
				<ScrollView
					contentContainerStyle={{
						padding: 12,
						paddingBottom: 16,
						gap: 16,
						flexGrow: 1,
						position: 'relative',
					}}
					keyboardShouldPersistTaps='handled'
					showsVerticalScrollIndicator={false}
				>
					<ScreenHeader
						sx={{
							justifyContent: 'space-between',
							py: 'md',
							position: 'absolute',
							zIndex: 9,
							left: 0,
							right: 0,
							backgroundColor: 'white',
						}}
					>
						<Button
							iconSx={{
								width: app$.font.get(),
								height: app$.font.get(),
							}}
							leftIcon='ArrowLeftOutlineIcon'
							onPress={() => navigation.goBack()}
						/>
					</ScreenHeader>

					<Controller
						control={control}
						name='displayName'
						render={({ field, fieldState }) => (
							<Input
								placeholder={i18n.t('common.display_name')}
								value={field.value}
								multiline={true}
								sx={{
									fontWeight: '900',
									fontSize: 40,
								}}
								containerSx={{
									mt: 90,
								}}
								errMessage={fieldState.error?.message}
								onChangeText={field.onChange}
							/>
						)}
					/>

					{fields.map((phoneNumber, index) => (
						<Controller
							key={phoneNumber.id}
							control={control}
							name={`phoneNumbers.${index}.number`}
							render={({ field, fieldState }) => (
								<Input
									placeholder={`${i18n.t('common.phone_number')} - ${index + 1}`}
									value={field.value}
									errMessage={fieldState.error?.message}
									type='number'
									onChangeText={(value) => {
										field.onChange(value);
									}}
								/>
							)}
						/>
					))}

					<Button
						leftIcon='CloseOutlineIcon'
						content={i18n.t('common.add_obj', {
							obj: i18n.t('common.phone_number').toLocaleLowerCase(),
						})}
						sx={{
							alignSelf: 'flex-end',
						}}
						contentSx={{
							fontSize: app$.font.get(),
						}}
						iconSx={{
							width: app$.font.get(),
							height: app$.font.get(),
							transform: [
								{
									rotate: '45deg',
								},
							],
						}}
						onPress={() => {
							append({
								label: 'mobile',
								number: '',
							});
						}}
					/>
				</ScrollView>

				<Button
					schema='black'
					contentSx={{
						fontSize: app$.font.get(),
					}}
					iconSx={{
						width: app$.font.get(),
						height: app$.font.get(),
					}}
					content={i18n.t('common.save')}
					leftIcon='PenOutlineIcon'
					sx={{
						position: 'absolute',
						bottom: 12,
						right: 12,
						zIndex: 999,
					}}
					onPress={handleSubmit(onSubmit)}
				/>
			</Screen>
		);
	},
);

export { DetailScreen };
